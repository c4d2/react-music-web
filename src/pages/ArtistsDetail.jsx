import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import BodyHead from '../components/BodyHead';

// material
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

// 接口
import { reqsingeralbum, reqsingerinfo, reqsingersong } from '../api/artist';
import { useParams } from 'react-router-dom';
import SkeletonH from '../components/SkeletonH';

import SongList from '../components/SongList';
import PlayPauseButton from '../components/PlayPauseButton';
import ArtistsInfo from '../components/ArtistDetail/ArtistsInfo';
import AlbumList from '../components/AlbumList';

export default function ArtistsDetail() {
    const [loading, setLoading] = useState(true);

    // 控制音乐开关
    const [isPause, setIspause] = useState(false);
    // 专辑
    const [singerAlbum, setSingerAlbum] = useState([]);
    // 歌手信息
    const [singerInfo, setSingerInfo] = useState([]);
    // 歌手歌曲
    const [singerSong, setSingerSong] = useState([]);

    const [focusId, setFocusId] = useState(0);

    // 弹窗打开控制
    const [open, setOpen] = useState(false);

    // 弹窗样式
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        width: '40vw',
        height: '70vh',
        bgcolor: 'rgb(37, 37, 37)',
        border: 'none',
        boxShadow: 24,
        p: 4,
        color: 'white',
        overflow: 'auto'
    };

    const { id } = useParams();
    useEffect(() => {
        const singera = reqsingeralbum(id, 6);
        const singeri = reqsingerinfo(id);
        const singers = reqsingersong(id);
        Promise.all([singera, singeri, singers])
            .then(([response1, response2, response3]) => {
                if (response1.data.code === 200) {
                    setSingerAlbum(response1.data);
                }
                if (response2.data.code === 200) {
                    setSingerInfo(response2.data);
                }
                if (response3.data.code === 200) {
                    setSingerSong(response3.data);
                    setLoading(false);
                }

            }).catch(e => {
                console.error(e);
            });
    }, [id])

    return (
        <Container>
            {
                loading && id ? <SkeletonH /> : (
                    singerAlbum && singerInfo && singerSong ? (
                        <Content image={singerSong.artist.img1v1Url}>
                            <Modal
                                open={open}
                                onClose={() => { setOpen(false) }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        简介
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2, whiteSpace: 'pre-line' }}
                                    >
                                        {singerInfo.briefDesc}
                                    </Typography>
                                    {
                                        singerInfo.count !== null ? singerInfo.introduction.map((item, index) => {
                                            return (
                                                <div key={item.id}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            paddingTop: '20px',
                                                            whiteSpace: 'pre-line'
                                                        }}
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        {item.ti}
                                                    </Typography>
                                                    <Typography
                                                        id="modal-modal-description"
                                                        sx={{
                                                            mt: 2,
                                                            whiteSpace: 'pre-line'
                                                        }}
                                                    >
                                                        {item.txt}
                                                    </Typography>
                                                </div>
                                            )
                                        }) : null
                                    }
                                </Box>
                            </Modal>
                            <BodyHead image={singerSong.artist.img1v1Url} name={singerSong.artist.name} description={singerSong.artist.briefDesc} />
                            <HotSong>
                                <PlayPauseButton
                                    item={singerSong.hotSongs[0]}
                                    list={singerSong.hotSongs}
                                    isPause={isPause}
                                    setIspause={setIspause}
                                />
                                <div className="head-text">
                                    <span className='text'>热门</span>
                                </div>
                                {
                                    singerSong.hotSongs.slice(0, 5).map((item, index) => {
                                        console.log(item)
                                        return (
                                            <div key={item.id}>
                                                <SongList
                                                    setFocusId={setFocusId}
                                                    focusId={focusId}
                                                    id={item.id}
                                                    index={index + 1}
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
                                <div className="info" >
                                    <div className="head-text">
                                        <span className='text'>关于</span>
                                    </div>
                                    <div onClick={() => { setOpen(true) }} className='info-button'>
                                        <ArtistsInfo image={singerAlbum.artist.img1v1Url} />
                                    </div>
                                </div>
                                <div className="album">
                                    <div className="head-text">
                                        <span className='text'>他参与的专辑</span>
                                    </div>
                                    <div className="playlist">
                                        {
                                            singerAlbum.hotAlbums.slice(0, 5).map((item, index) => {
                                                return (
                                                    <div className='playlist-item' key={item.id}>
                                                        <AlbumList
                                                            playlistid={'al' + item.id}
                                                            url={item.picUrl}
                                                            name={item.name}
                                                            description={item.subType}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </HotSong>
                        </Content>
                    ) : null
                )
            }
        </Container>
    )
}

const Container = styled.div`
    min-height: 90vh;
`;

const Content = styled.div`
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
`;

const HotSong = styled.div`
    background: rgba(0,0,0,0.7);
    min-height: 60vh;
    .head-text{
        padding-top: 20px;
        .text{
            height: 40px;
            color: white;
            font-size: 27px;
            font-weight: bolder;
        }
        padding-left: 20px;
        padding-bottom: 20px;
    }
    .info{
        padding-top: 20px;
    }
    .album{
        .playlist{
            display: flex;  
            justify-content: start;
            gap: 1%;
            margin-left: 1rem;
            margin-right: 1rem;
            .playlist-item{
                width: 20%;
            }
        }
    }
`;