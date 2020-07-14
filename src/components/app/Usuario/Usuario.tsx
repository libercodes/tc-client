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
import { State, Usuario } from '../../../utils/types'
import { objetoAcciones } from '../../../utils/group-actions'

import { 
    Delete,
    Edit,
    Visibility
} from '../../Icons/ActionIcons'
import { PersonAdd, Search } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const UsuarioComponent = () => {
    const history = useHistory()
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ filteredList, setFilteredList ] = useState(state.listaDeUsuarios)
    useEffect(() => setFilteredList(state.listaDeUsuarios), [state.listaDeUsuarios])

    const VerificarPermisos = (permiso: string) => {
        let indice = state.credentials.usuario.grupo.acciones.indexOf(permiso)
        return indice === -1 ? false : true
    }

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeUsuarios.filter(
            usuario => usuario.nombreDeUsuario.toUpperCase().includes(query.toUpperCase())
            || usuario.nombre.toUpperCase().includes(query.toUpperCase()) 
            || usuario.apellido.toUpperCase().includes(query.toUpperCase()) 
            || usuario.email.toUpperCase().includes(query.toUpperCase()) 
        ))

    
    useEffect(() => {
        const getUsuarios = async() => {
            let { data } = await axios.get('/api/admin/listar-usuarios', axiosConfig(state.credentials.token))
            dispatch({
                type: 'LISTAR_USUARIOS',
                payload: data
            })
        }
        getUsuarios()
    },[dispatch, state.credentials.token])

    const handleModificar = (usuario: Usuario) => {
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        history.push(`/home/usuarios/modificar-usuario/${usuario._id}`)
    }

    const handleConsultar = (usuario: Usuario) => {
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        history.push(`/home/usuarios/consultar-usuario/${usuario._id}`)
    }

    const handleEliminarUsuario = async (usuario: Usuario) => {
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        history.push(`/home/usuarios/eliminar-usuario/${usuario._id}`)
    }

    return(
        <Fragment>  
            <Container fluid className="h-100 justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col sm={8} className="bg-light mt-2 py-3">
                        <Row>
                            <Col sm={6} className="text-center">
                                <h2>Administrar <b>usuarios</b></h2>
                            </Col>
                            <Col sm={6} className="text-center">
                                {
                                    VerificarPermisos(objetoAcciones.GESTIONAR_USUARIO.AGREGAR_USUARIO) &&
                                    <Button 
                                        variant="success"
                                        onClick={() => history.push("/home/usuarios/agregar-usuario")}
                                    > 
                                        <PersonAdd/>  Agregar usuario
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col sm={8} className="bg-light py-3">
                        <Row className="justify-content-center">
                            <Col sm={1} xs={1} className="d-flex align-items-center justify-content-end p-0">
                                <Search/>
                            </Col>
                            <Col sm={6} xs={10}>
                                <Form.Control 
                                    type="text"
                                    placeholder="Filtrar por usuario, email, nombre, apellido..."
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
                                    <th>Apellido</th>
                                    <th>Usuario</th>
                                    <th>email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredList.length > 0 &&
                                    filteredList.map(usuario => (
                                        <tr key={usuario._id}>
                                            <td>{usuario._id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.nombreDeUsuario}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                {
                                                    VerificarPermisos(objetoAcciones.GESTIONAR_USUARIO.MODIFICAR_USUARIO) &&
                                                    <Edit
                                                        className="mx-1"
                                                        onClick={() => handleModificar(usuario)}
                                                    >Editar</Edit>

                                                }
                                                {
                                                    (VerificarPermisos(objetoAcciones.GESTIONAR_USUARIO.ELIMINAR_USUARIO) && state.credentials.usuario._id !== usuario._id) &&
                                                    <Delete 
                                                        className="mx-1"
                                                        onClick={() => 
                                                            handleEliminarUsuario(usuario)
                                                        }
                                                    >Eliminar</Delete>
                                                }
                                                <Visibility 
                                                    onClick={() => handleConsultar(usuario)}
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

export default UsuarioComponent