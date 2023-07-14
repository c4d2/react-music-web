import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { reqhotsearch } from '../../api/search';

export default function ComList(props) {

    const { setKeyWord, setOpen } = props;

    const [list, setList] = useState([]);
    useEffect(() => {
        const hotsearch = reqhotsearch();
        hotsearch.then((response) => {
            if (response.data.code === 200) {
                setList(response.data.data);
            }
        }).catch(e => {
            console.error(e);
        })
    }, [])

    const handleClick = (item) => {
        setKeyWord(item.searchWord);
        setOpen(false);
    }

    return (
        <Container>
            {
                list ? (
                    list.map((item, index) => {
                        return (
                            <li
                                onClick={() => { handleClick(item) }}
                                key={item.searchWord}>{item.searchWord}</li>
                        )
                    })
                ) : null
            }
        </Container>
    )
}

const Container = styled.div`
    li{
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        cursor: pointer;
    }
    li:hover{
        border-radius: 2px;
        background-color: rgba(0,0,0,0.1);
    }
`;