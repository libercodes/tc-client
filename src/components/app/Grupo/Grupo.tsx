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
import { State, Usuario, Grupo } from '../../../utils/types'
import Modal from '../../Modal'
import getConfig from '../../../utils/axiosConfig'
import { 
    Edit,
    Delete,
    Security,
    Visibility
} from '../../Icons/ActionIcons'



const GrupoComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ showDeleteModal, SetShowDeleteModal ] = useState(false)
    useEffect(() => {
        const getGrupos = async() => {
            let { data } = await axios.get('/api/admin/consultar-grupo', axiosConfig(state.credentials.token))
            dispatch({
                type: 'CONSULTAR_GRUPO',
                payload: data
            })
        }
        getGrupos()
    })

    const handleEdit = (grupo: Grupo) => {

    }

    const handleShowModal = (grupo: Grupo) => {
        dispatch({ type: 'SELECCIONAR_GRUPO' , payload: grupo })
        SetShowDeleteModal(true)
    }

    const handleDelete = async (grupo: Grupo) => {
        SetShowDeleteModal(true)
        const poseeUsuarios: Usuario[] = state.listaDeUsuarios.filter(usuario => usuario.grupo._id == grupo._id)
        if(poseeUsuarios.length > 0){

        } else {
            let { data } = await axios.delete(`/api/admin$/${grupo._id}`, getConfig(state.credentials.token))
            if(data){
                dispatch({
                    type: "ELIMINAR_GRUPO",
                    payload: grupo
                })
                console.log(data)
                SetShowDeleteModal(false)
            }
        }
    }

    return(
        <Fragment>
            
            <Modal 
                show={showDeleteModal}
                onCancel={() => SetShowDeleteModal(false)}
                title="Borrar grupo"
                description={`Desea borrar el grupo "${state.grupoSeleccionado.nombre}"?`}
                nameAgreeButton={"Eliminar"}
                onAgree={() => handleDelete(state.grupoSeleccionado)}
            />
            
            <Container fluid className="h-100 justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col sm={8} className="bg-primary text-light py-2">
                        <h2>Administrar <b>grupos</b></h2>
                    </Col>
                </Row>
                <Row className="justify-content-center overflow-auto">
                    <Col sm={8}>
                        <Table variant="dark">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.listaDeGrupos.map(grupo => (
                                        <Fragment key={grupo._id}>
                                            <td>{grupo._id}</td>
                                            <td>{grupo.nombre}</td>
                                            <td>
                                                <Edit 
                                                    className="mx-1"
                                                    onClick={() => handleEdit(grupo)}
                                                >Editar</Edit>
                                                <Delete
                                                    className="mx-1"
                                                    onClick={() => 
                                                        handleShowModal(grupo)
                                                    }
                                                >Eliminar</Delete>
                                                <Security 
                                                    className="mx-1"
                                                    onClick={() => {}}
                                                >Permisos</Security>
                                                <Visibility
                                                    onClick={()=>{}}
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

export default GrupoComponent