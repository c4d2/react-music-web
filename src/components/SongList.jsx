import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ChangeTime from '../global/timechange';

import eventBus from '../store/event-bus';

// 接口
import { reqsongcheck } from '../api/song';

export default function SongList(props) {

    // 直接跳转路由
    const navigate = useNavigate();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    // 检查音乐是否可用
    const [check, setCheck] = useState(false);

    const { focusId, id, index, picUrl, songid, artistid, songname, artistname, albumname, dt } = props;

    useEffect(() => {
        // 检查音乐是否可用
        const checks = reqsongcheck(songid);
        checks.then((response) => {
            if (response.data.message === 'ok') {
                setCheck(true);
            }
        }).catch(e => {
            console.log(e)
        })
    }, [songid])

    const handleDoubleClick = () => {
        // 双击存储并播放
        // 获取localStorage中的值
        const myList = JSON.parse(localStorage.getItem('mySonglist')) || [];
        // 存储目前的长度
        const length = myList.length;

        const newitem = { id, picUrl, songid, artistid, songname, artistname, albumname, dt, length: length + 1 }
        // 发送给Footer.jsx
        eventBus.emit('playmusic', newitem);

        // 检查是否已经存在相同的项
        const isDuplicated = myList.some(item => { return item.songid === songid });
        if (!isDuplicated) {
            // 向数组中添加新元素
            myList.push({ id, picUrl, songid, artistid, songname, artistname, albumname, dt, length: length + 1 });
            // 将更新后的数据存储到localStorage中
            localStorage.setItem('mySonglist', JSON.stringify(myList));
        }
    }

    useEffect(() => {
        const { minutes, seconds } = ChangeTime(dt / 1000);
        setSeconds(seconds);
        setMinutes(minutes);
    }, [dt])

    return (
        <Container>
            <div className={check ? '' : 'disabled'}>
                <ul onDoubleClick={handleDoubleClick}
                    onClick={() => { props.setFocusId(id); }}
                    className={focusId === id ? 'list-content list-content-active' : 'list-content'}>
                    <li className='first'>{index}</li>
                    <li className='second'>
                        <img
                            src={picUrl}
                            alt={songname}
                        />
                        <div className='second-text'>
                            <span className='text1' onClick={() => { navigate(`/song/${songid}`) }}>{songname}</span>
                            <span className='text2' onClick={() => { navigate(`/artists/${artistid}`); }}>{artistname}</span>
                        </div>
                    </li>
                    <li className='third'>
                        <span>{albumname}</span>
                    </li>
                    <li className='four'>
                        <span>{minutes}:{seconds}</span>
                    </li>
                </ul>
            </div>
        </Container>
    )
}

const Container = styled.div`
    .disabled{
        pointer-events: none;
        opacity: 0.2;
    }
    .list-content{
        color: #b3b3b3;
        font-size: 14px;
        align-content: center;
        align-items: center;
        margin: 0px;
        height: 50px;
        padding-left: 20px;
        padding-right: 20px;
        list-style: none;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 2vw;
        justify-content: space-between;
        .first{
            width: 1vw;
        }
        .second{
            width: 25vw;
            display: flex;
            align-items: center;
            .second-text{
                display: flex;
                flex-direction: column;
                padding-left: 10px;
            }
            .text1{
                font-size: 16px;
                color: white;
            }
            .text1:hover{
                cursor: pointer;
                text-decoration: underline;
            }
            .text2{
                font-size: 13px;
            }
            .text2:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
        .third{
            font-size: 13px;
            width: 35vw;
        }
        .third:hover{
            cursor: pointer;
            text-decoration: underline;
        }
        .four{
            font-size: 13px;
            width: 3vw;
        }
        img{
            height: 35px;
        }
        li{
            white-space: nowrap;
            overflow: hidden;
        }
    }
    .list-content:hover{
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
    .list-content-active{
        border-radius: 5px;
        background-color: rgba(226, 226, 226, 0.4);
    }
`;