import React from 'react';
import { styled } from 'styled-components';

import SearchInput from './SearchInput';
import { MdAccountBox } from "react-icons/md";

export default function NavBar(props) {

  const { setKeyWord, keyWord } = props;

  return (
    <Container>
      <div className="navbar">
        <div className="search-input">
          <SearchInput
            keyWord={keyWord}
            setKeyWord={setKeyWord}
            setSonglist={props.setSonglist}
          />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .navbar{
    background-color: #121212;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-input{
      margin-left: 50px;
      width: 30%;
    }
}  
`;