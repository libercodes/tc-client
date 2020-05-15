import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { 
    Nav, 
    Navbar, 
    Modal, 
    Col
} from "react-bootstrap";
import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`
const SideBar = (props: any) => {
    return (
        <Wrapper>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">App panel</Modal.Title>
            </Modal.Header>
            <Nav className="list-group list-group-flush">
                <Link to="/home/grupos" className="list-group-item list-group-item-action bg-light">Grupos</Link>
                <Link to="/home/usuarios" className="list-group-item list-group-item-action bg-light">Usuarios</Link>
                <Link to="/home/sesiones" className="list-group-item list-group-item-action bg-light">Sesiones</Link>
                <Link to="/home/movimientos" className="list-group-item list-group-item-action bg-light">Movimientos</Link>

            </Nav>
        </Wrapper>
        );
};
export default SideBar