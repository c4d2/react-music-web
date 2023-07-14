import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { MdSearch } from "react-icons/md";
import { Popover } from 'antd';

// 接口
import { reqsearchresult } from '../../api/search';

// 组件
import ComList from './ComList';

export default function SearchInput(props) {
    const inputRef = useRef();

    const { setSonglist } = props;

    // 关键词
    const { setKeyWord, keyWord } = props;


    // enter键按下
    const handleDown = (event) => {
        if (event.keyCode === 13) {
            // 发送请求
            const keyword = inputRef.current.value;
            setKeyWord(keyword);
        }
    }

    // 请求数据返回数据 并且存储localStorage
    const storageList = (keyword) => {
        if (keyword) {
            const list = JSON.parse(localStorage.getItem('historySearch')) || [];
            // 将每次搜索的数据存在localStorage里面
            // 创造一个set数据结构用于去重
            const mylist = new Set(list);
            // 删除本来有的关键词
            mylist.delete(keyword);

            // 将数据放入mylist中
            mylist.add(keyword);
            // 计算现在set的长度  超出则删除第一个元素
            const len = mylist.size;

            // 将set转换为数组
            const Arraylist = Array.from(mylist);

            if (len > 10) {
                localStorage.setItem('historySearch', JSON.stringify(Arraylist.slice(1)));
            } else
                localStorage.setItem('historySearch', JSON.stringify(Arraylist));

            // 搜索歌曲
            const search = reqsearchresult(keyword);
            search.then((response) => {
                if (response.data.code === 200) {
                    setSonglist(response.data.result.songs);
                }
            }).catch(e => {
                console.error(e);
            })
        }
    }

    useEffect(() => {
        storageList(keyWord);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWord])

    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <Container>
            <div className='search'>
                <MdSearch className='search-icons' />
                <Popover
                    content={<ComList
                        setOpen={setOpen}
                        setKeyWord={setKeyWord}
                    />}
                    title="热门搜索"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <input
                        ref={inputRef}
                        onKeyDown={handleDown}
                        type="text"
                    />
                </Popover>

            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 50px;
    border-radius: 50px;
    background-color: #242424;
    display: flex;
    
    .search{
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        .search-icons{
            margin-left: 10px;
            color: white;
            width: 20px;
            height: 20px; 
            width: 10%;
        }
        input{
            border-radius: 50px;
            font-size: 16px;
            background-color: #242424;
            border: none;
            height: 40px;
            left: 50px;
            height: 30px;
            outline: none;
            width: 80%;
            color: white;
            overflow: hidden;
        }
    }
`;