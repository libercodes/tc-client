import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { 
    Nav, 
    Modal, 
} from "react-bootstrap";
import styled from 'styled-components'
import {
    Group,
    Person,
    History,
    Schedule
} from '@material-ui/icons'

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
                <Link 
                    to="/home/grupos" 
                    className="list-group-item list-group-item-action bg-light"
                >
                    <Group/> Grupos
                </Link>
                <Link 
                    to="/home/usuarios" 
                    className="list-group-item list-group-item-action bg-light"
                >
                    <Person/> Usuarios
                </Link>
                <Link 
                    to="/home/sesiones" 
                    className="list-group-item list-group-item-action bg-light"
                >
                    <Schedule/> Sesiones
                </Link>
                <Link 
                    to="/home/movimientos" 
                    className="list-group-item list-group-item-action bg-light"
                >
                    <History/> Movimientos
                </Link>

            </Nav>
        </Wrapper>
        );
};
export default SideBar