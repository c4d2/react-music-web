import React from 'react';
import styled from 'styled-components';
import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";
import IconButton from '@mui/material/IconButton';

import eventBus from '../store/event-bus';

import { reqsongcheck } from '../api/song';

export default function PlayPauseButton(props) {
    // 获取localStorage中的值
    const myList = JSON.parse(localStorage.getItem('mySonglist')) || [];
    // 存储目前的长度
    const length = myList.length;
    const { isPause, setIspause } = props;
    const { list, item } = props;

    const handleClick = () => {
        if (!isPause) {
            if (item) {
                const newitem = trim(item, 0)
                // 广播给footer 然后播放音乐
                eventBus.emit('playmusic', newitem)
                if (!list) {
                    // 检查是否已经存在相同的项
                    const isDuplicated = myList.some(subitem => { return subitem.songid === newitem.songid });
                    if (!isDuplicated) {
                        // 向数组中添加新元素
                        myList.push(newitem);
                        // 将更新后的数据存储到localStorage中
                        localStorage.setItem('mySonglist', JSON.stringify(myList));
                    }
                }
            }
            if (list) {
                var count = 0;
                for (let i = 0; i < list.length; i++) {
                    // 检查音乐是否可用  再决定是否添加
                    const checks = reqsongcheck(list[i].id);
                    // eslint-disable-next-line no-loop-func
                    checks.then((response) => {
                        if (response.data.message === 'ok') {
                            const newitem = trim(list[i], count)
                            count = count + 1;
                            // 检查是否已经存在相同的项
                            const isDuplicated = myList.some(subitem => { return subitem.id === newitem.id });
                            if (!isDuplicated) {
                                // 向数组中添加新元素
                                myList.push(newitem);
                                // 将更新后的数据存储到localStorage中
                                localStorage.setItem('mySonglist', JSON.stringify(myList));
                            }
                        }
                    }).catch(e => {
                        console.error(e);
                    })
                }
            }
        }
        setIspause(!isPause);
    }

    // 整理信息
    const trim = (item, index) => {
        // 整理信息
        const id = item.id;
        const picUrl = item.al.picUrl;
        const songid = item.id;
        const artistid = item.ar[0].id;
        const songname = item.name;
        const artistname = item.ar[0].name;
        const albumname = item.al.name;
        const dt = item.dt;

        return {
            id, picUrl, songid, artistid, songname, artistname, albumname, dt, length: length + index + 1
        }
    }


    return (
        <Container>
            <IconButton aria-label={isPause ? 'play' : 'pause'} onClick={handleClick}>
                {
                    isPause ?
                        <MdPauseCircleFilled className='pause' /> :
                        <MdPlayCircleFilled className='pause' />
                }
            </IconButton>

        </Container>
    )
}


const Container = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    .pause{
        padding-left: 20px;
        color: #1ed760;
        font-size: 70px;
    }
    .pause:hover{
        padding-left: 15px;
        font-size: 80px;
        cursor: pointer;
    }
`;