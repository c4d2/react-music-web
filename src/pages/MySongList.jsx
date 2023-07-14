import React, { useState } from 'react';
import styled from 'styled-components';
import SongList from '../components/SongList';

import eventBus from '../store/event-bus';

import { BiTrash } from "react-icons/bi";

export default function MySongList() {
    const [focusId, setFocusId] = useState(0);
    const [list, setList] = useState(JSON.parse(localStorage.getItem('mySonglist')) || []);

    const handleClick = (newitem, index) => {
        const { id, picUrl, songid, artistid, songname, artistname, albumname, dt } = newitem;
        // 发送给Footer.jsx
        eventBus.emit('playmusic', { id, picUrl, songid, artistid, songname, artistname, albumname, dt, length: index });
    }

    const handleDelete = (index) => {
        const mylist = JSON.parse(localStorage.getItem('mySonglist')) || [];
        // 删除对应元素
        mylist.splice(index, 1);
        localStorage.setItem('mySonglist', JSON.stringify(mylist));
        setList(mylist);
    }

    const hancleAllDelete = () => {
        // 删除所有localStorage
        localStorage.removeItem('mySonglist');
        setList([]);
    }

    return (
        <Container>
            <div className='head'>
                <div className="head-text">
                    <span>队列</span>
                </div>
                <div className='clear' onClick={hancleAllDelete}>
                    <span>删除全部</span>
                    <BiTrash className='icon' />
                </div>
            </div>
            {
                list.map((item, index) => {
                    return (
                        <div className='list' key={item.id} onDoubleClick={() => { handleClick(item, index + 1); console.log(item) }}>
                            <SongList
                                setFocusId={setFocusId}
                                focusId={focusId}
                                id={item.id}
                                index={index + 1}
                                picUrl={item.picUrl}
                                songid={item.songid}
                                artistid={item.artistid}
                                songname={item.songname}
                                artistname={item.artistname}
                                albumname={item.albumname}
                                dt={item.dt}
                            />
                            <BiTrash
                                onClick={() => { handleDelete(index) }}
                                className='icon' />
                        </div>
                    )
                })
            }
        </Container>
    )
}

const Container = styled.div`
    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 50px;
        color: white;
        .head-text{
            padding-top: 20px;
            span{
                height: 40px;
                color: white;
                font-size: 27px;
                font-weight: bolder;
            }
            padding-left: 16px;
            padding-bottom: 16px;
        }
        .clear:hover{
            font-size: 14px;
        }
        .clear{
            cursor: pointer;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 12px;
            .icon{
                height: 20px;
                width: 20px;
            }
        }
    }
    .list{
        display: flex;
        align-items: center;
        .icon{
            color: white;
            cursor: pointer;
        }
        .icon:hover{
            position: relative;
            right: 2px;
            height: 20px;
            width: 20px;
        }
    }

`;