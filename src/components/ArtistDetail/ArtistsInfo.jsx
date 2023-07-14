import React from 'react';

import styled from 'styled-components'

export default function ArtistsInfo(props) {
    const { image } = props;
    return (
        <Container>
            <div className='image'>
                <img
                    src={image}
                    alt=""
                />
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 35vh;
    width: 50vw;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    background-color: rgba(87, 87, 87, 0.5);
    .image{
        margin-left: 50px;
        height: 220px;
        width: 220px;
        border-radius: 50%;
        overflow: hidden;
        img{
            height: 100%;
        }
    }
    &:hover{
        cursor: pointer;
    }
`;