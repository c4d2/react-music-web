import React from 'react';
import styled from 'styled-components'

// react-dom
import { NavLink } from 'react-router-dom';

export default function MyNavLink(props) {
    const activeClassName = ({ isActive }) => {
        // console.log(isActive);
        return isActive ? 'Mylist-group-item Myactive' : 'Mylist-group-item'
    }

    return (
        <Container>
            <NavLink className={activeClassName} {...props} />
        </Container>
    )
}

const Container = styled.div`
    .Mylist-group-item {
        color: #b3b3b3;
        text-decoration: none;
    }
    .Myactive {
        color: white;
    }
`;