import React, { Fragment, useContext } from "react";
import { Link } from 'react-router-dom'
import { 
    Nav, 
    Modal, 
} from "react-bootstrap";
import styled from 'styled-components'
import {
    Group,
    Person,
    BarChart,
    Schedule
} from '@material-ui/icons'
import { UserContext } from "../../context/context";
import { objetoAcciones } from '../../utils/group-actions'
const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
`
const SideBar = (props: any) => {
    const { state } = useContext(UserContext)
    const VerificarPermisos = (permiso: string) => {
        let indice = state.credentials.usuario.grupo.acciones.indexOf(permiso)
        return indice === -1 ? false : true
    }
    return (
        <Wrapper>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">App panel</Modal.Title>
            </Modal.Header>
            <Nav className="list-group list-group-flush">
                {
                    VerificarPermisos(objetoAcciones.GESTIONAR_GRUPO.LISTAR_GRUPOS) && 
                    <Link 
                        to="/home/grupos" 
                        className="list-group-item list-group-item-action bg-light"
                    >
                        <Group/> Grupos
                    </Link>
                }
                {
                    VerificarPermisos(objetoAcciones.GESTIONAR_USUARIO.LISTAR_USUARIOS) && 

                    <Link 
                        to="/home/usuarios" 
                        className="list-group-item list-group-item-action bg-light"
                    >
                        <Person/> Usuarios
                    </Link>
                }
                {
                    VerificarPermisos(objetoAcciones.GESTIONAR_SESION.LISTAR_SESIONES) && 
                    <Link 
                        to="/home/sesiones" 
                        className="list-group-item list-group-item-action bg-light"
                    >
                        <Schedule/> Sesiones
                    </Link>

                }
                {
                    VerificarPermisos(objetoAcciones.GESTIONAR_MOVIMIENTO.LISTAR_MOVIMIENTOS) && 
                    <Link 
                        to="/home/movimientos" 
                        className="list-group-item list-group-item-action bg-light"
                    >
                        <BarChart/> Movimientos
                    </Link>  
                }

            </Nav>
        </Wrapper>
        );
};
export default SideBar