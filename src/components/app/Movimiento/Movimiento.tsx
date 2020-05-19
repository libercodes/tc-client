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
import { State, Usuario, Movimiento } from '../../../utils/types'
import moment from 'moment'
import { Search } from '@material-ui/icons'
import { Visibility } from '../../Icons/ActionIcons'
import { useHistory } from 'react-router-dom'

const MovimientoComponent = () => {
    const history = useHistory()
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ filteredList, setFilteredList ] = useState(state.listaDeMovimientos)
    useEffect(() => setFilteredList(state.listaDeMovimientos), [state.listaDeMovimientos])

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeMovimientos.filter(movimiento => movimiento.usuario.nombreDeUsuario.toUpperCase().includes(query.toUpperCase())))

        
    useEffect(() => {
        const getSesiones = async() => {
            let { data } = await axios.get('/api/admin/movimientos', axiosConfig(state.credentials.token))
            console.log(data)
            dispatch({
                type: 'LISTAR_MOVIMIENTOS',
                payload: data
            })
        }
        getSesiones()
    }, [])

    const handleConsultar = (movimiento: Movimiento) => {
        dispatch({ type: 'SELECCIONAR_MOVIMIENTO', payload: movimiento })
        history.push(`/home/movimientos/consultar-movimiento/${movimiento._id}`)
    }
    return(
        <Fragment>
            <Container fluid className="h-100 justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col sm={8} className="bg-primary text-light py-2">
                        <Row>
                            <Col sm={12} className="text-center">
                                <h2>Consultar <b>sesiones</b></h2>
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
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>descripcion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    (filteredList.length > 0 ) && 
                                    
                                    filteredList.map(movimiento => (
                                        <tr key={movimiento._id}>
                                            <td>{movimiento.usuario ? movimiento.usuario.nombreDeUsuario : "USUARIO BORRADO"}</td>
                                            <td>{moment(movimiento.fecha).format('LLL')}</td>
                                            <td>{'Ver descripcion'}</td>
                                            <td>
                                                <Visibility 
                                                    onClick={() => handleConsultar(movimiento)}
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

export default MovimientoComponent