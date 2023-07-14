import React from 'react';
import styled from 'styled-components';

import { Skeleton, Card } from '@mui/material';

export default function SkeletonH() {
    const cardData = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ];
    return (
        <Container>
            <div className='space'>
                {
                    cardData.map((item, index) => {
                        return (
                            <Card key={item.id} className='card'>
                                <Skeleton variant="rounded" height={120} sx={{ background: 'gray' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
                            </Card>
                        )
                    })
                }
            </div>
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
            <div className='space'>
                {
                    cardData.map((item, index) => {
                        return (
                            <Card key={item.id} className='card'>
                                <Skeleton variant="rounded" height={120} sx={{ background: 'gray' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem', background: 'gray' }} />
                            </Card>
                        )
                    })
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;    
  .space{
    display: grid;
    overflow: hidden;
    grid-auto-flow: column;
    grid-template-columns: repeat(6, minmax(200px, 1fr)); /* 自适应列宽 */
    grid-gap: 1vw;
    .card{
        background-color: rgba(0,0,0,0);
        height: 30vh;
    }
  }
  
`;