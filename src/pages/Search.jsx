import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 组件
import NavBar from '../components/Search/NavBar';
import SongList from '../components/SongList';
import History from '../components/Search/History';
import AlbumList from '../components/AlbumList';
import { reqhotalbum, reqhotsong } from '../api/search';

export default function Search() {

  const [songlist, setSonglist] = useState([]);

  const [focusId, setFocusId] = useState(0);

  const [focushotid, setHotFocusId] = useState(0);

  // 搜索关键词
  const [keyWord, setKeyWord] = useState(null);

  // 热搜歌单
  const [albumlist, setAlbumlist] = useState([]);

  // 热搜歌曲
  const [hotsong, setHotsong] = useState([]);

  useEffect(() => {
    // 获取热搜推荐歌单
    const lista = reqhotalbum();
    const lisths = reqhotsong();
    Promise.all([lista, lisths])
      .then(([response1, response2]) => {
        if (response1.data.code === 200) {
          setAlbumlist(response1.data.result);
        }
        if (response2.data.code === 200) {
          setHotsong(response2.data.result);
          console.log(response2.data.result)
        }
      }).catch(e => {
        console.error(e);
      })
  }, []);

  return (
    <Container>
      <div className='search-input'>
        <NavBar
          setKeyWord={setKeyWord}
          keyWord={keyWord}
          setSonglist={setSonglist}
        />
      </div>
      <div className="history">
        <div className='text'>
          <span>
            最近的搜索记录
          </span>
        </div>
        <History
          setKeyWord={setKeyWord}
        />
      </div>
      {
        songlist.length ? (
          <div className="result">
            <div className='text'>
              <span>
                搜索歌曲结果
              </span>
            </div>
            {
              songlist.map((item, index) => {
                return (
                  <div key={item.id}>
                    <SongList
                      setFocusId={setFocusId}
                      focusId={focusId}
                      id={item.id}
                      index={index}
                      picUrl={item.al.picUrl}
                      songid={item.id}
                      artistid={item.ar[0].id}
                      songname={item.name}
                      artistname={item.ar[0].name}
                      albumname={item.al.name}
                      dt={item.dt}
                    />
                  </div>
                )
              })
            }
          </div>
        ) : <div className='result'>
          <div className='text'>
            <span>
              热搜歌曲
            </span>
          </div>
          <div className='song'>
            {
              hotsong.length ? (
                hotsong.map((item, index) => {
                  return (
                    <SongList
                      setFocusId={setHotFocusId}
                      focusId={focushotid}
                      id={item.id}
                      index={index + 1}
                      picUrl={item.picUrl}
                      songid={item.id}
                      artistid={item.song.artists[0].id}
                      songname={item.name}
                      artistname={item.song.artists[0].name}
                      albumname={item.song.album.name}
                      dt={item.song.duration}
                    />
                  )
                })
              ) : null
            }
          </div>
          <div className='text'>
            <span>
              热搜歌单
            </span>
          </div>
          <div className='album'>
            {
              albumlist.length ? (
                albumlist.map((item, index) => {
                  return (
                    <div className='album-item' key={item.id}>
                      <AlbumList
                        playlistid={item.id}
                        url={item.picUrl}
                        description={item.name}
                      />
                    </div>
                  )
                })
              ) : null
            }
          </div>

        </div>
      }
    </Container>
  )
}

const Container = styled.div`
    .text{
      padding-top: 20px;
      span{
          height: 40px;
          color: white;
          font-size: 20px;
          font-weight: bolder;
      }
      padding-left: 20px;
      padding-bottom: 20px;
    }
    .result{
      margin-top: 50px;
      .album{
        display: flex;  
        justify-content: start;
        gap: 1%;
        margin-left: 1rem;
        margin-right: 1rem;
        .album-item{
          width: 20%;
        }
      }
    }
`;