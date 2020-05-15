import React, { Fragment, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import axiosConfig from '../../../utils/axiosConfig'
import {
    Table, 
    Container, 
    Col, 
    Row,
    Button
} from 'react-bootstrap'
import { UserContext } from '../../../context/context'
import { State, Usuario } from '../../../utils/types'
import Modal from '../../Modal'
import getConfig from '../../../utils/axiosConfig'

import { 
    Delete,
    Edit,
    Visibility
} from '../../Icons/ActionIcons'


const UsuarioComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ showDeleteModal, SetShowDeleteModal ] = useState(false)
    const [ modalDescription, setModalDescription ] = useState('')
    useEffect(() => {
        const getUsuarios = async() => {
            let { data } = await axios.get('/api/admin/consultar-usuario', axiosConfig(state.credentials.token))
            dispatch({
                type: "CONSULTAR_USUARIO",
                payload: data
            })
        }
        getUsuarios()
    })

    const handleEdit = (usuario: Usuario) => {

    }

    const handleShowModal = (usuario: Usuario) => {
        setModalDescription(`Desea borrar el usuario "${state.usuarioSeleccionado.nombreDeUsuario}"?`)
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        SetShowDeleteModal(true)
    }

    const handleDelete = async (usuario: Usuario) => {
        SetShowDeleteModal(true)
        let { data } = await axios.delete(`/api/admin$/eliminar-usuario/${usuario._id}`, getConfig(state.credentials.token))
            if(data){
                dispatch({
                    type: "ELIMINAR_USUARIO",
                    payload: usuario
                })
                console.log(data)
                setModalDescription('')
                //setSelectedValue({})
                SetShowDeleteModal(false)
            }
    }

    return(
        <Fragment>
            
            <Modal 
                show={showDeleteModal}
                onCancel={() => SetShowDeleteModal(false)}
                title="Borrar grupo"
                description={modalDescription}
                nameAgreeButton={"Eliminar"}
                onAgree={() => handleDelete(state.usuarioSeleccionado)}
            />
            
            <Container fluid className="h-100 justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col sm={8} className="bg-primary text-light py-2">
                        <h2>Administrar <b>usuarios</b></h2>
                    </Col>
                </Row>
                <Row className="justify-content-center overflow-auto">
                    <Col sm={8}>
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Usuario</th>
                                    <th>email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.listaDeUsuarios.map(usuario => (
                                        <Fragment key={usuario._id}>
                                            <td>{usuario._id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.nombreDeUsuario}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <Edit 
                                                    className="mx-1"
                                                    onClick={() => handleEdit(usuario)}
                                                >Editar</Edit>
                                                <Delete 
                                                    className="mx-1"
                                                    onClick={() => 
                                                        handleShowModal(usuario)
                                                    }
                                                >Eliminar</Delete>
                                                <Visibility 
                                                    onClick={() => {}}
                                                >Consultar</Visibility>
                                            </td>
                                        </Fragment>
                                    ))
                                }
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default UsuarioComponent