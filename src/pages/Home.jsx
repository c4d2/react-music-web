import React, { useEffect, useState, Suspense } from 'react';

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import SkeletonH from '../components/SkeletonH';

import { reqrecommendlist, reqhot } from '../api/playlist';

// 组件
// import AlbumList from '../components/AlbumList';

const AlbumList = React.lazy(() => import('../components/AlbumList'));

export default function Home() {
    // 热歌分类表
    const [list, setList] = useState([]);
    // 加载状态
    const [loading, setLoading] = useState(true);
    // 各个歌单list
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const listhot = reqhot();
        listhot.then((response) => {
            setList(response.data.tags);
        }).catch(e => {
            console.error(e);
        })
    }, [])

    useEffect(() => {
        const li = [];
        const promises = [];

        for (let i = 0; i < list.length; i++) {
            const listplaylist = reqrecommendlist(list[i].playlistTag.name);
            promises.push(listplaylist);
        }
        // 等操作全部完成再存取response
        Promise.all(promises)
            .then((responses) => {
                for (let i = 0; i < responses.length; i++) {
                    li.push(responses[i].data.playlists.slice(0, 6));
                }
                setPlaylist(li);
            }).then(() => {
                setLoading(false);
            }).catch(e => {
                console.error(e);
            })
    }, [list])

    return (
        <Container>
            {
                 <div>
                    {
                        playlist && Array.isArray(playlist) && list ?
                            list.map((item, index) => {
                                return (
                                    <div key={item.createTime} className='list'>
                                        <div className='head'>
                                            <NavLink to={"/" + item.playlistTag.name} className='head_text1'>
                                                <span>{item.playlistTag.name}</span>
                                            </NavLink>
                                            <NavLink to={"/" + item.playlistTag.name} className="head_text2">
                                                <span>显示全部</span>
                                            </NavLink>
                                        </div>
                                        <div className='playlist'>
                                            {
                                                playlist[index] && Array.isArray(playlist[index]) ? (
                                                    playlist[index].slice(0, 5).map((subitem) => {
                                                        return (
                                                            <div className='playlist-item' key={subitem.id}>
                                                                <Suspense fallback={<div>Loading...</div>}>
                                                                    <AlbumList
                                                                        playlistid={subitem.id}
                                                                        url={subitem.coverImgUrl}
                                                                        name={subitem.name.split('|')[0]}
                                                                        description={subitem.description}
                                                                    />
                                                                </Suspense>
                                                            </div>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                )
                            }) : null
                    }
                </div>
            }

        </Container>
    )
}

const Container = styled.div`
  position: relative;
  top: 20px;
  background-color: #121212;
  display: grid;
  gap: 10px;
  .list{
    overflow-x: hidden;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 1rem;
    height: 41vh;
    overflow: hidden  ;
    .head{
        display: flex;
        justify-content: space-between;
        height: 5vh;
        .head_text1{
            white-space: nowrap;
            color: white;
            font-size: 24px;
            font-weight: bolder;
            text-decoration: none;
        }
        .head_text1:hover{
            text-decoration: underline;
        }
        .head_text2{
            white-space: nowrap;
            font-size: 14px;
            font-weight: bold;
            color: #b3b3b3;
            text-decoration: none;
        }
        .head_text2:hover{
            text-decoration: underline;
        }
    }
    .playlist{
        width: 100%;
        padding-top: 1rem;
        justify-content: start;
        display: flex;
        grid-gap: 1rem;
        .playlist-item{
            width: 20%;
        }
    }
  }
`;
