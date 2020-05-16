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
import Modal from '../../Modal'
import getConfig from '../../../utils/axiosConfig'
import { Link } from 'react-router-dom'

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
    const [ showDeleteModal, SetShowDeleteModal ] = useState(false)
    const [ modalDescription, setModalDescription ] = useState('')
    const [ filteredList, setFilteredList ] = useState(state.listaDeUsuarios)
    useEffect(() => setFilteredList(state.listaDeUsuarios), [state.listaDeUsuarios])

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeUsuarios.filter(usuario => usuario.nombreDeUsuario.toUpperCase().includes(query.toUpperCase())))

    
    useEffect(() => {
        const getUsuarios = async() => {
            let { data } = await axios.get('/api/admin/consultar-usuario', axiosConfig(state.credentials.token))
            dispatch({
                type: "CONSULTAR_USUARIO",
                payload: data
            })
        }
        getUsuarios()
    },[])

    const handleModificar = (usuario: Usuario) => {
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        history.push(`/home/usuarios/modificar-usuario/${usuario._id}`)
    }

    const handleConsultar = (usuario: Usuario) => {
        dispatch({ type: "SELECCIONAR_USUARIO", payload: usuario })
        history.push(`/home/usuarios/consultar-usuario/${usuario._id}`)
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
                    payload: data
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
                        <Row>
                            <Col sm={6} className="text-center">
                                <h2>Administrar <b>usuarios</b></h2>
                            </Col>
                            <Col sm={6} className="text-center">
                                <Button variant="success"> 
                                    <PersonAdd/> 
                                    <Link
                                        to="/home/usuarios/agregar-usuario"
                                    >
                                        Agregar usuario
                                    </Link>
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
                                    placeholder="Nombre de usuario"
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
                                                <Edit 
                                                    className="mx-1"
                                                    onClick={() => handleModificar(usuario)}
                                                >Editar</Edit>
                                                <Delete 
                                                    className="mx-1"
                                                    onClick={() => 
                                                        handleShowModal(usuario)
                                                    }
                                                >Eliminar</Delete>
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