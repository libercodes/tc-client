import React from 'react'
import styled from 'styled-components'

const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
`

export default () => {
    return(
        <BackDrop>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </BackDrop>
    )
}