import React, { useContext } from 'react'
import { 
    Row, 
    Col, 
    Button,
} from 'react-bootstrap'
import { UserContext } from '../../../context/context'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const MovimientoForm = () => {
    const history = useHistory()
    const { state } = useContext(UserContext)

    return(
        <Row className="m-0 justify-content-center align-items-center h-100">
            <Col xs={12} md={6} lg={4} className="border rounded-lg p-4 bg-light">
                
                <p>
                    <b>Fecha:</b> {moment(state.movimientoSeleccionado.fecha).format('LLL')}
                </p>
                <p>
                    <b>Usuario:</b> {state.movimientoSeleccionado.usuario.nombreDeUsuario}
                </p>
                <p>
                    <b>Descripcion:</b>
                </p>
                <div 
                    className="overflow-auto h-25"
                    dangerouslySetInnerHTML={{ __html: state.movimientoSeleccionado.descripcion }}
                >

                </div>

                <div className="col text-center">
                    <Button 
                        variant="primary"
                        className="m-3 text-center"
                        onClick={() => history.goBack()}
                        >
                        Volver
                    </Button>
                </div>
            </Col>
        </Row>
    )
}


export default MovimientoForm