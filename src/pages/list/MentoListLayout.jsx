import { Icon } from 'src/components/common/icon/Icon';
import * as S from './List.style';
import MentoCardItem from '../main/MentoCardItem';
import { Link } from 'react-router-dom';

const MentoListLayout = () => {
  return (
    <S.ListWrapper>
      <S.ListSearchContainer>
        <S.ListSearchList>
          <S.ListSearchItem className="active">멘토</S.ListSearchItem>
          <S.ListSearchItem>
            <Link to="/list/post">POST</Link>
          </S.ListSearchItem>
        </S.ListSearchList>
        <S.ListSearchBox>
          <form>
            <Icon name="Search" />
            <label>
              <input type="text" />
            </label>
            <button>검색</button>
          </form>
        </S.ListSearchBox>
        <S.SearchFilterBox>
          <h3>
            <p>검색 필터</p>
            <p className="fold">
              <Icon name="Fold" size={20} /> <span>접기</span>
            </p>
          </h3>
          <S.CategoryFilterBox>
            <h3>
              <Icon name="Circle" size={20} />
              <span>직무</span>
            </h3>
            <ul>
              <li className="active">BACKEND</li>
              <li>FRONTEND</li>
              <li>INFRA</li>
              <li>INFRA</li>
              <li>PROGRAMMING_LANGUAGE</li>
              <li>DBA</li>
            </ul>
          </S.CategoryFilterBox>
          <S.CategoryFilterBox>
            <h3>
              <Icon name="Circle" size={20} />
              <span>스택</span>
            </h3>
            <ul>
              <li className="active">JAVA</li>
              <li>SPRING</li>
              <li>JPA</li>
              <li>SPRING_BOOT</li>
              <li>SPRING_JDBC</li>
              <li>SQL</li>
              <li>DBMS_RDBMS</li>
              <li>REDIS</li>
              <li>POSTGRE_SQL</li>
              <li>MSA</li>
              <li>REACT</li>
              <li>REACT_NATIVE</li>
              <li>VUE</li>
              <li>TYPE_SCRIPT</li>
              <li>NEXT_JS</li>
              <li>SVELTE</li>
              <li>JAVA_SCRIPT</li>
              <li>KUBERNETES</li>
              <li>JENKINS</li>
              <li>GITHUB_ACTION</li>
              <li>HARBOR</li>
              <li>DOCKER</li>
              <li>PYTHON</li>
              <li>KOTLIN</li>
              <li>C_PLUS_PLUS</li>
              <li>TYPE_SCRIPT</li>
              <li>JAVA</li>
              <li>JAVA_SCRIPT</li>
              <li>RUBY</li>
              <li>GO</li>
              <li>RUST</li>
              <li>DBMS_RDBMS</li>
              <li>MYSQL</li>
              <li>MONGODB</li>
              <li>MARIA</li>
              <li>ORACLE</li>
            </ul>
          </S.CategoryFilterBox>
        </S.SearchFilterBox>
        <S.ListCardsContainer>
          <article>
            <div>
              <h3>멘토</h3>
            </div>
            <ul>
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
              <MentoCardItem />
            </ul>
          </article>
        </S.ListCardsContainer>
      </S.ListSearchContainer>
      <S.PaginationContainer>
        <ul>
          <li className="active">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li className="next">다음</li>
        </ul>
      </S.PaginationContainer>
    </S.ListWrapper>
  );
};

export default MentoListLayout;
