import React, { Fragment, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import axiosConfig from '../../../utils/axiosConfig'
import {
    Table, 
    Container, 
    Col, 
    Row,
    Button,
    Form
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

import { GroupAdd, Search } from '@material-ui/icons'



const GrupoComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ showDeleteModal, SetShowDeleteModal ] = useState(false)

    const [ filteredList, setFilteredList ] = useState(state.listaDeGrupos)
    useEffect(() => setFilteredList(state.listaDeGrupos), [state.listaDeGrupos])

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeGrupos.filter(grupo => grupo.nombre.toUpperCase().includes(query.toUpperCase())))

    useEffect(() => {
        const getGrupos = async() => {
            let { data } = await axios.get('/api/admin/consultar-grupo', axiosConfig(state.credentials.token))
            dispatch({
                type: 'CONSULTAR_GRUPO',
                payload: data
            })
        }
        getGrupos()
    }, [])

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
            let { data } = await axios.delete(`/api/admin$/eliminar-grupo/${grupo._id}`, getConfig(state.credentials.token))
            if(data){
                dispatch({
                    type: "ELIMINAR_GRUPO",
                    payload: data
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
                        <Row>
                            <Col sm={6} className="text-center">
                                <h2>Administrar <b>grupos</b></h2>
                            </Col>
                            <Col sm={6} className="text-center">
                                <Button variant="success"> 
                                    <GroupAdd/> Agregar Grupo
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center my-3">
                    <Col sm={8} className="bg-light py-2 rounded">
                        <Row className="justify-content-center">
                            <Col sm={1} xs={1} className="d-flex align-items-center justify-content-end p-0">
                                <Search/>
                            </Col>
                            <Col sm={6} xs={10}>
                                <Form.Control 
                                    type="text"
                                    placeholder="Nombre del grupo"
                                    onChange={(e:any) => FilterList(e.target.value)}
                                    />
                            </Col>
                        </Row>
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
                                    filteredList.length > 0 &&
                                    filteredList.map(grupo => (
                                        <tr key={grupo._id}>
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
                                        </tr>
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