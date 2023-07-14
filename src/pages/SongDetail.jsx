import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SkeletonH from '../components/SkeletonH';

//接口
import { reqsongDetail, reqsonglyric, reqsimsong } from '../api/song';
import { reqsimalbum } from '../api/playlist';

import AlbumList from '../components/AlbumList';

// 组件
import BodyHead from '../components/BodyHead';
import SongList from '../components/SongList';
import PlayPauseButton from '../components/PlayPauseButton';

export default function SongDetail() {
  // 播放暂停按钮
  const [isPause, setIspause] = useState(false);
  // 加载
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [focusId, setFocusId] = useState(0);

  // 歌曲详情
  const [songdetail, setSongtail] = useState([]);
  // 相关专辑
  const [simalbum, setSimAlbum] = useState([]);

  const [lyric, setLyric] = useState('');

  const [simlist, setSimlist] = useState(null);
  useEffect(() => {
    // 用id获取音乐详情
    const songd = reqsongDetail(id);
    // 音乐歌词
    const songl = reqsonglyric(id);
    // 相似音乐
    const songs = reqsimsong(id);
    // 歌曲相似专辑
    const songa = reqsimalbum(id);
    Promise.all([songd, songl, songs, songa]).then(([response1, response2, response3, response4]) => {
      if (response1.data.code === 200 && response2.data.code === 200 && response3.data.code === 200 && response4.data.code === 200) {
        setLyric(response2.data.lrc.lyric.replace(/\[(.*?)\]/g, ''));
        setSongtail(response1.data.songs[0]);
        setSimlist(response3.data.songs);
        setSimAlbum(response4.data.playlists);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
      console.log(response4);
    }).catch(e => {
      console.error(e);
    })
  }, [id])

  return (
    <Container>
      {
        loading && id ? <SkeletonH></SkeletonH> : (
          <Detail image={songdetail.al.picUrl}>
            <BodyHead image={songdetail.al.picUrl} name={songdetail.name} titledesc={songdetail.ar[0].name} description={songdetail.al.name} />
            <div className="songtable">
              <PlayPauseButton
                item={songdetail}
                isPause={isPause}
                setIspause={setIspause}
              />
              <Lyric>
                <div className='head-text'>
                  <span>歌词</span>
                </div>
                <div className='lyric-content'>
                  {lyric}
                </div>
              </Lyric>
              <SimilarSong>
                <div className='head-text'>
                  <span>推荐</span>
                  <p>基于此歌曲</p>
                </div>
                <div className='list'>
                  {
                    simlist !== null ?
                      simlist.map((item, index) => {
                        return (
                          <div key={item.id}>
                            <SongList
                              setFocusId={setFocusId}
                              focusId={focusId}
                              id={item.id}
                              index={index}
                              picUrl={item.album.picUrl}
                              songid={item.id}
                              artistid={item.artists[0].id}
                              songname={item.name}
                              artistname={item.artists[0].name}
                              albumname={item.name}
                              dt={item.duration}
                            />
                          </div>
                        )
                      }) : null
                  }
                </div>
              </SimilarSong>
              <SimilarAlbum>
                <div className='head-text'>
                  <span>相似专辑</span>
                </div>
                <div className="playlist">
                  {
                    simalbum.map((item, index) => {
                      return (
                        <div className='playlist-item' key={item.id}>
                          <AlbumList
                            playlistid={item.id}
                            url={item.coverImgUrl}
                            name={item.name}
                            description={item.description}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </SimilarAlbum>
            </div>
          </Detail>
        )
      }
    </Container >
  )
}

const Container = styled.div`
  .songtable{
    height: 65%;
    background: rgba(0,0,0,0.7);
    min-height: 58.5vh;
  }
`;

const Detail = styled.div`
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        filter: blur(100px);
        z-index: -1;
    }
    .songtable{
      padding-left: 20px;
      padding-right: 20px;
      .head-text{
        padding-top: 20px;
        span{
          height: 40px;
          color: white;
          font-size: 27px;
          font-weight: bolder;
        }
        p{
          color: #b7b8b9;
          font-size: 14px;
        }
      }
    }
`;

const Lyric = styled.div`
  .lyric-content{
    line-height: 30px;
    color: #b7b8b9;
    white-space: pre-line;
  }
`;

const SimilarSong = styled.div`
  .list{
      margin-top: 10px;
  }
`;

const SimilarAlbum = styled.div`
  .playlist{
    width: 100%;
    padding-top: 1rem;
    justify-content: start;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(5); /* 自适应列宽 */
    grid-gap: 1vw;
    
  }
`;