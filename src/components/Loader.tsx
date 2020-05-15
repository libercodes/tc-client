import React from 'react'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
const BackDrop = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,1);
    position: fixed;
    flex-direction: column;
    z-index: 100;
`

export default () => {
    return(
        <BackDrop>
            <Spinner variant="light" animation="border" style={{ width: "70px", height: "70px"}} />
            <h2 className="text-light my-3">Cargando...</h2>
        </BackDrop>
    )
}