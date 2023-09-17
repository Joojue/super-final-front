import axios from 'axios';
import { useEffect, useState } from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import useJwtToken from 'src/hooks/useJwt';
import StompJs from 'stompjs';

// import { useHttp } from './useHttp';

export function useChatSocket(chatroomId, myId) {
  const [sock, setSock] = useState(null);
  const [stomp, setStomp] = useState(null);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const { jwtToken, decodedToken } = useJwtToken();
  const [page, setPage] = useState(0);
  const [prevId, setPrevId] = useState(null);

  // Initialize WebSocket and Stomp
  useEffect(() => {
    const newSock = new sockjs('https://codevelop.store/code-velop');
    const newStomp = StompJs.over(newSock);

    setSock(newSock);
    setStomp(newStomp);

    return () => {
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, [chatroomId]);

  // WebSocket connection logic
  useEffect(() => {
    if (sock && stomp) {
      const stompConnect = () => {
        try {
          stomp.connect(
            {
              heartbeat: {
                outgoing: 1000, // 클라이언트에서 서버로 주기적으로 HEARTBEAT 메시지를 보내는 주기 (밀리초)
                incoming: 1000, // 서버에서 클라이언트로 주기적으로 HEARTBEAT 메시지를 보내는 주기 (밀리초)
              },
            },
            () => {
              stomp.subscribe(`/chatroom/${chatroomId}`, (message) => {
                const receiveMsg = JSON.parse(message.body);
                setData((prevData) => [...prevData, receiveMsg]);
              });
            },
          );
        } catch (err) {
          console.error('WebSocket 연결 시도 중 오류 발생:', err);
        }
      };
      stompConnect();
    }
  }, [sock, stomp, chatroomId]);

  // HTTP request logic
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get('https://codevelop.store/api/v1/message', {
          params: {
            ChatRoomId: chatroomId,
            page: page,
          },
          headers: {
            Authorization: jwtToken,
          },
        });
        setData((prevData) => [...res.data.data, ...prevData]);
      } catch (error) {
        console.error('HTTP 요청 중 오류 발생:', error);
      }
    };
    fetchPage();
  }, [page]);

  useEffect(() => {
    const fetchChatLog = async () => {
      try {
        const res = await axios.get('https://codevelop.store/api/v1/selectroom', {
          params: {
            ChatRoomId: chatroomId,
          },
        });
        setPage(0);
        setData(res.data.data);
      } catch (err) {
        console.log('HTTP 요청 에러', err);
      }
    };
    fetchChatLog();
  }, [chatroomId]);

  // Send message through WebSocket
  const sendMessage = async (formattedTime) => {
    const newMessage = {
      senderId: myId,
      chatContent: text,
      sendAt: formattedTime,
      chatRoomId: chatroomId,
    };
    stomp.send(`/ws/${chatroomId}`, {}, JSON.stringify(newMessage));
    setText('');
  };

  return {
    data,
    text,
    setText,
    sendMessage,
    setPage,
  };
}
