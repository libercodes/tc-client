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
import { 
    Edit,
    Delete,
    Security,
    Visibility
} from '../../Icons/ActionIcons'
import { useHistory } from 'react-router-dom'
import { GroupAdd, Search } from '@material-ui/icons'



const GrupoComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ showDeleteModal, SetShowDeleteModal ] = useState(false)

    const [ filteredList, setFilteredList ] = useState(state.listaDeGrupos)
    useEffect(() => setFilteredList(state.listaDeGrupos), [state.listaDeGrupos])

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeGrupos.filter(grupo => grupo.nombre.toUpperCase().includes(query.toUpperCase())))
    const history = useHistory()
    useEffect(() => {
        const getGrupos = async() => {
            let { data } = await axios.get('/api/admin/consultar-grupo', axiosConfig(state.credentials.token))
            console.log(data)
            dispatch({
                type: 'CONSULTAR_GRUPO',
                payload: data
            })
        }
        getGrupos()
    }, [])

    const handleModificar = (grupo: Grupo) => {
        dispatch({ type: 'SELECCIONAR_GRUPO', payload: grupo })
        history.push(`/home/grupos/modificar-grupo/${grupo._id}`)
    }

    const handleConsultar = (grupo: Grupo) => {
        dispatch({ type: 'SELECCIONAR_GRUPO', payload: grupo })
        history.push(`/home/grupos/consultar-grupo/${grupo._id}`)
    }

    const handleEliminarUsuario = async (grupo: Grupo) => {
        dispatch({ type: 'SELECCIONAR_GRUPO', payload: grupo })
        history.push(`/home/grupos/eliminar-grupo/${grupo._id}`)
    }

    return(
        <Fragment>
            <Container fluid className="h-100 justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col sm={8} className="bg-light mt-2 py-3">
                        <Row>
                            <Col sm={6} className="text-center">
                                <h2>Administrar <b>grupos</b></h2>
                            </Col>
                            <Col sm={6} className="text-center">
                                <Button 
                                    variant="success"
                                    onClick={() => history.push("/home/grupos/agregar-grupo")}
                                > 
                                    <GroupAdd/> Agregar Grupo
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col sm={8} className="bg-light py-3 ">
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
                                                    onClick={() => handleModificar(grupo)}
                                                >Editar</Edit>
                                                <Delete
                                                    className="mx-1"
                                                    onClick={() => 
                                                        handleEliminarUsuario(grupo)
                                                    }
                                                >Eliminar</Delete>
                                                <Security 
                                                    className="mx-1"
                                                    onClick={() => {}}
                                                >Permisos</Security>
                                                <Visibility
                                                    onClick={()=> handleConsultar(grupo)}
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