import React from 'react';
import styled from 'styled-components';

import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ArtistsList(props) {
    // 直接路由跳转
    const { playlistid, url, name, description } = props;
    const navigate = useNavigate();

    return (
        <Container>
            <Card onClick={() => { navigate(`/artists/${playlistid}`) }} key={playlistid} className='card_playlist' >
                <CardContent>
                    <img
                        src={url}
                        alt=""
                    />
                    <p>{name}</p>
                    <span>{description}</span>
                </CardContent>
            </Card>
        </Container>
    )
}

const Container = styled.div`
    .card_playlist{
        width: 200px;
        height: 32vh;
        white-space: nowrap;
        border-radius: 10px;
        background: linear-gradient(to bottom, #0f0f0f,#1f1f1f);
        overflow: hidden;
        img{
            width: 100%;
            border-radius: 50%;
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
`;