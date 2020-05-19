import React, { useContext } from 'react'
import { 
    Row, 
    Col, 
    Table, 
    Badge, 
    OverlayTrigger, 
    Tooltip, 
    Button,
    Alert
} from 'react-bootstrap'
import { UserContext } from '../../../context/context'
import { useHistory } from 'react-router-dom'

const Perfil = () => {
    const { state } = useContext(UserContext)
    const history = useHistory()
    const establecerEstado = () => {
        if(state.credentials.usuario.estado === "Activo"){
            return "success"
        } else if ( state.credentials.usuario.estado  === "Inactivo"){
            return "danger"
        } else {
            return "warning"
        }
    }
    return(
        <Row className="m-0 justify-content-center align-items-center h-100">
             <Col lg={4} md={6} xs={12} className="border rounded-lg p-4 bg-light">
                 <h1 className="text-center">
                    <u>Perfil</u>
                </h1>
                {
                    state.credentials.usuario.estado === "Nuevo" &&
                    <Alert variant="warning">
                        Por favor actualice su clave para finalizar el proceso de registro.
                    </Alert>
                }
                 <Table variant="light">
                    <tbody>
                        <tr>
                            <td>
                                <h3>
                                    @{state.credentials.usuario.nombreDeUsuario}
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="estado">
                                                Estado
                                            </Tooltip>
                                        }
                                    >
                                        <Badge 
                                            variant={establecerEstado()}
                                            className="mx-2"
                                        >
                                            {state.credentials.usuario.estado}
                                        </Badge>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="grupo">
                                                Grupo
                                            </Tooltip>
                                        }
                                    >
                                        <Badge variant="info">{state.credentials.usuario.grupo.nombre}</Badge>
                                    </OverlayTrigger>


                                    

                                </h3>

                            </td>
                        </tr>
                        <tr className="d-flex">
                            <td><b>ID</b></td>
                            <td>{state.credentials.usuario._id}</td>
                        </tr>
                        <tr className="d-flex">
                            <td><b>Nombre</b></td>
                            <td>{state.credentials.usuario.nombre}</td>
                        </tr>
                        <tr className="d-flex">
                            <td><b>Apellido</b></td>
                            <td>{state.credentials.usuario.apellido}</td>
                        </tr>
                        <tr className="d-flex">
                            <td><b>E-mail</b></td>
                            <td>{state.credentials.usuario.email}</td>
                        </tr>
                    </tbody>
                 </Table>
                 <div className="col text-center">
                    <Button
                        onClick={() => history.push('/auth/recuperar-clave')}
                    >
                        Cambiar clave
                    </Button>
                 </div>
             </Col>
        </Row>
    )
}

export default Perfil