import React from 'react';
import styled from 'styled-components';
import { MdHomeFilled, MdSearch } from "react-icons/md";

import MyNavLink from './MyNavLink';

export default function SideBar() {
  return (
    <Container>
      <div className="top_links">
        <ul>
          <MyNavLink to="/">
            <li>
              <MdHomeFilled className='home_icon' />
              <span>Home</span>
            </li>
          </MyNavLink>
          <MyNavLink to='/search'>
            <li>
              <MdSearch className='search_icon' />
              <span>Search</span>
            </li>
          </MyNavLink>
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 10px;
  background-color: #121212;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top_links{
    ul{
      list-style: none;
      padding-left: 1rem;
      li{
        height: 3rem;
        font-size: 16px;
        display: grid;
        align-items: center;
        grid-template-columns: 20% 80%;
        .home_icon{
          font-size: 25px;
        }
        .search_icon{
          font-size: 25px;
        }
      }
      li:hover{
        color: white;
        cursor: pointer;
      }
    }
  }
`;
