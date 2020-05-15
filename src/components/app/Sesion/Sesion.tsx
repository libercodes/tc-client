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
import moment from 'moment'
import { PersonAdd } from '@material-ui/icons'

const SesionComponent = () => {
    const state : State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
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
                            <Col sm={6} className="text-center">
                                <h2>Administrar <b>usuarios</b></h2>
                            </Col>
                            <Col sm={6} className="text-center">
                                <Button variant="success"> 
                                    <PersonAdd/> Agregar usuario
                                </Button>
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
                                    (state.listaDeSesiones.length > 0 ) && 
                                    
                                    state.listaDeSesiones.map(sesion => (
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