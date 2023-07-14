import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Tag } from 'antd';

export default function History(props) {

    const { setKeyWord } = props;

    // 获取localStorage中存取的数据
    const list = JSON.parse(localStorage.getItem('historySearch')) || [];

    const handleClose = (item) => {
        // 获取localStorage中的值
        const myList = new Set(JSON.parse(localStorage.getItem('historySearch')) || []);
        // 创建一个new set
        myList.delete(item);
        localStorage.setItem("historySearch", JSON.stringify(Array.from(myList)));
    }

    // 点击tags
    const handleClick = (item) => {
        setKeyWord(item);
    }

    return (
        <Container>
            {
                list.length ? list.map((item, index) => {
                    return (
                        <Tag
                            onClick={() => { handleClick(item) }}
                            key={index}
                            onClose={() => { handleClose(item) }}
                            className='tag'
                            bordered={false} closable>
                            {item}
                        </Tag>
                    )
                }) : null
            }
        </Container>
    )
}

const Container = styled.div`
    padding-left: 20px;
    .tag{
        color: black;
        background-color: white;
        cursor: pointer;
    }
`;