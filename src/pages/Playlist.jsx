import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// materials
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { reqrecommendlist } from '../api/playlist';
import SkeletonH from '../components/SkeletonH';

export default function Playlist() {
    const { cat } = useParams(); // 从路由参数中获取id值
    const navigate = useNavigate();
    // 加载
    const [loading, setLoading] = useState(true);

    const [playlist, SetPlaylist] = useState([]);
    useEffect(() => {
        const list = reqrecommendlist(cat);
        list.then((response) => {
            console.log(response)
            SetPlaylist(response.data.playlists)
        }).then(() => {
            setLoading(false);
        }).catch(e => {
            console.error(e);
        })
    }, [cat])
    return (
        <Container>
            {
                loading ? <SkeletonH></SkeletonH> : <div className='list'>
                    <div className='head'>
                        <span>{cat}</span>
                    </div>
                    <div className='playlist'>
                        {
                            playlist && Array.isArray(playlist) ? (
                                playlist.map((subitem) => {
                                    return (
                                        <Card onClick={() => { navigate(`/playlist/${subitem.id}`) }} key={subitem.id} className='card_playlist' >
                                            <CardContent>
                                                <img
                                                    src={subitem.coverImgUrl}
                                                    alt=""
                                                />
                                                <p>{subitem.name.split('|')[0]}</p>
                                                <span>{subitem.description}</span>
                                            </CardContent>
                                        </Card>
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
  background-color: #121212;
  display: grid;
  gap: 10px;
  .list{
    padding-left: 20px;
    padding-right: 20px;
    .head{
        display: flex;
        justify-content: space-between;
        height: 5vh;
        span{
            white-space: nowrap;
            color: #b3b3b3;
            font-size: 24px;
            font-weight: bolder;
            text-decoration: none;
        }
    }
    .playlist{
        display: flex;  
        flex-wrap: wrap;
        justify-content: center;
        gap: 1vw;
        .card_playlist{
            width: 200px;
            height: 32vh;
            border-radius: 10px;
            background: linear-gradient(to bottom, #0f0f0f,#1f1f1f);
            img{
                width: 100%;
                border-radius: 5px;
            }
            p{
                color: white;
                font-size: 16px;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 180px; /* 文本所在容器的最大宽度 */
            }
            span{
                display: inline-block;
                color: #a7a7a7;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 180px; /* 文本所在容器的最大宽度 */
            }
            span:hover{
                text-decoration: underline;
            }
        }
        .card_playlist:hover{
            background: #292929;
            cursor: pointer;
        }
    }
  }
`;