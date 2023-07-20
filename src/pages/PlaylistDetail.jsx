import React, { useEffect, useState, Suspense } from 'react';

import styled from 'styled-components';

//react-router-dom
import { useParams } from 'react-router-dom';

import { reqplaylist } from '../api/playlist';
import { reqalbumDetail } from '../api/playlist';
import SkeletonH from '../components/SkeletonH';

import PlayPauseButton from '../components/PlayPauseButton';
import BodyHead from '../components/BodyHead';
// import SongList from '../components/SongList';

const SongList = React.lazy(() => import('../components/SongList'))

export default function PlaylistDetail() {

    // 播放暂停按钮
    const [isPause, setIspause] = useState(false);
    const [loading, setLoading] = useState(true);
    // url传递来的playlist id
    const { id } = useParams();
    // 将专辑歌曲存入playlist
    const [playlist, setPlaylist] = useState([]);

    const [allplaylist, setAllplaylist] = useState([]);

    const [focusId, setFocusId] = useState(0);

    const [picUrl, setPicUrl] = useState('');

    useEffect(() => {
        if (id.slice(0, 2) === 'al') {
            const list = reqalbumDetail(id.substring(2));
            list.then((response) => {
                setAllplaylist(response.data.album)
                setPicUrl(response.data.album.picUrl)
                setPlaylist(response.data.songs);
            }).then(() => {
                setLoading(false);
            }).catch(e => {
                console.error(e);
            }).finally(() => {
                setLoading(false);
            })
        }
        else {
            const list = reqplaylist(id);
            list.then((response) => {
                setAllplaylist(response.data.playlist);
                setPicUrl(response.data.playlist.coverImgUrl);
                setPlaylist(response.data.playlist.tracks);
            }).then(() => {
                setLoading(false);
            }).catch(e => {
                console.error(e);
            })
        }
    }, [id])

    return (
        <Container>
            {
                loading && id ? <SkeletonH></SkeletonH> : (
                    <Detail image={picUrl}>
                        <BodyHead
                            image={picUrl}
                            name={allplaylist.name.split('|')[0]}
                            titledesc={allplaylist.name.split('|')[1]}
                            description={allplaylist.description} />
                        <div className="songtable">
                            <PlayPauseButton
                                item={playlist[0]}
                                list={playlist}
                                isPause={isPause}
                                setIspause={setIspause}
                            />
                            <div className='table'>
                                <ul className='title'>
                                    <li style={{ width: '0.5vw' }}>#</li>
                                    <li style={{ width: '22vw' }}>标题</li>
                                    <li style={{ width: '38vw' }}>专辑</li>
                                    <li style={{ width: '2vw' }}>时长</li>
                                </ul>
                                <div className='list'>
                                    {
                                        playlist.map((item, index) => {
                                            return (
                                                <div key={item.id}>
                                                    <Suspense fallback={<div>Loading...</div>}>
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
                                                    </Suspense>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Detail>
                )
            }
        </Container>
    )
}

const Container = styled.div`
    .songtable{
        height: 65%;
        background: rgba(0,0,0,0.8);
        min-height: 58.5vh;
        .table{
            padding-left: 24px;
            padding-right: 24px;
            .title{
                margin-top: 10px;
                margin-bottom: 0px;
                height: 30px;
                padding-left: 20px;
                padding-right: 20px;
                color: #b3b3b3;
                font-size: 0.875rem;
                list-style: none;
                display: grid;
                grid-auto-flow: column;
                grid-gap: 2vw;
                justify-content: space-between;
                border-bottom: 1px solid #656768;
                li{
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .list{
                margin-top: 10px;
            }
        }
        
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
        background: rgba(0,0,0,0.1);
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;
        filter: blur(100px);
        z-index: -1;
    }
`;