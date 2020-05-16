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
import moment from 'moment'
import { Search } from '@material-ui/icons'

const SesionComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ filteredList, setFilteredList ] = useState(state.listaDeSesiones)
    useEffect(() => setFilteredList(state.listaDeSesiones), [state.listaDeSesiones])

    const FilterList = (query: string) => 
        setFilteredList(state.listaDeSesiones.filter(sesion => sesion.usuario.nombreDeUsuario.toUpperCase().includes(query.toUpperCase())))

        
    useEffect(() => {
        const getSesiones = async() => {
            let { data } = await axios.get('/api/admin/sesiones', axiosConfig(state.credentials.token))
            console.log(data)
            dispatch({
                type: 'CONSULTAR_SESION',
                payload: data
            })
        }
        getSesiones()
    }, [])

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
                                    <th>Fecha de inicio</th>
                                    <th>Fecha de finalizacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    (filteredList.length > 0 ) && 
                                    
                                    filteredList.map(sesion => (
                                        <tr key={sesion._id}>
                                            <td>{sesion.usuario.nombreDeUsuario}</td>
                                            <td>{moment(sesion.fechaDeInicio).format('LLL')}</td>
                                            <td>{moment(sesion.fechaDeFinalizacion).format('LLL')}</td>
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

export default SesionComponent