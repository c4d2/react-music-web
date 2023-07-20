import React from 'react';
import { styled } from 'styled-components';

import Footer from './Footer';
import SideBar from '../components/SideBar';
import Home from './Home';
import Search from './Search';
import Playlist from './Playlist';
import PlaylistDetail from './PlaylistDetail';
import SongDetail from './SongDetail';
import ArtistsDetail from './ArtistsDetail';



import { Routes, Route } from 'react-router-dom';
import MySongList from './MySongList';

export default function Spotify() {
    return (
        <Container>
            <div className="spotify_body">
                <SideBar />
                <div className="body">
                    <div className="body__contents">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:cat" element={<Playlist />}></Route>
                            <Route path="/search" element={<Search />} />
                            <Route path="/playlist/:id" element={<PlaylistDetail />} />
                            <Route path="/song/:id" element={<SongDetail />} />
                            <Route path='/artists/:id' element={<ArtistsDetail />} />
                            <Route path='/mysong' element={<MySongList />} />
                        </Routes>
                    </div>
                </div>
            </div>
            <div className="spotify__footer">
                <Footer />
            </div>
        </Container>
    )
}

const Container = styled.div`
  overflow: hidden;
  display: grid;  // 允许将元素分割为行和列
  grid-template-rows: 90vh 8vh;
  gap: 5px;
  .spotify_body{
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: 20vw 79vw;
    gap: 5px;
    .body{
        display: grid;
        border-radius: 10px;
        overflow: auto;  //当内容超出当前容器的尺寸时 就会显示滚动条
        .body__contents{
            height: 100%;
            background-color: #121212;
            overflow-x: hidden;
        }
    }
  }
`;
