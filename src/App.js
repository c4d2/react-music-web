import React from 'react';
import { styled } from 'styled-components';
import Spotify from './pages/Spotify';

import { BrowserRouter } from 'react-router-dom'


export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Spotify />
      </BrowserRouter>
    </Container>
  )
}

const Container = styled.div`
 margin: 5px;
`;