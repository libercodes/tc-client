import React, { FunctionComponent, useContext, useEffect, useState, Fragment } from 'react'
import { 
    Form, 
    Button ,
    Row,
    Col,
    Alert
} from 'react-bootstrap'
import { useHistory, NavLink } from 'react-router-dom'
import { IContext, UserContext  } from '../../../context/context'
import axios from 'axios'
import axiosConfig from '../../../utils/axiosConfig'


const UsuarioForm: FunctionComponent = (props) => {
    const [ inputNombre, setInputNombre ] = useState('')
    const [ inputApellido, setInputApellido ] = useState('')
    const [ inputEmail, setInputEmail ] = useState('')
    const [ inputNombreDeUsuario, setInputNombreDeUsuario ] = useState('')
    const [ inputClave, setInputClave ] = useState('')
    const [ inputConfirmarClave, setInputConfirmarClave ] = useState('')
    const [ inputGrupo, setInputGrupo ] = useState('')

    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')


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

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const payload = {
            nombre: inputNombre,
            apellido: inputApellido,
            email: inputEmail,
            nombreDeUsuario: inputNombreDeUsuario,
            clave: inputClave,
            grupo: inputGrupo
        }
        try {
            let { data } = await axios.post('/api/admin/agregar-usuario', payload, axiosConfig(state.credentials.token))
            console.log(data)
            dispatch({
                type: 'AGREGAR_USUARIO',
                payload: data.usuario
            })
            setMessage(data.message)
        } catch (error) {
            setError(error.response.data.error)
        }
    }
    return (
        <Row className="m-0 justify-content-center align-items-center h-100">
            <Col xs={12} md={6} lg={3} className="border rounded-lg p-4 bg-light">
                {
                    message ?
                    <Fragment>
                        <h2 className="modal-title m-3">Usuario Creado</h2>
                        <p>{message}</p>
                        <div className="col text-center">
                            <Button 
                                variant="success"
                                onClick={() => history.goBack()}
                                className="text-center"
                            >Volver</Button>
                        </div>
                    </Fragment> :
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        {
                            error &&
                            <Fragment>
                                <Alert variant="danger">{error}</Alert>
                            </Fragment>
                        }
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputNombre(e.target.value)}
                                required
                                type="text"
                                placeholder="Nombre"
                                
                            />
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputApellido(e.target.value)}
                                required
                                type="text"
                                placeholder="Apellido"
                                
                            />
                            <Form.Label>email</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputEmail(e.target.value)}
                                required
                                type="email"
                                placeholder="email@ejemplo.com"
                                
                            />
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputNombreDeUsuario(e.target.value)}
                                required
                                type="text"
                                placeholder="nombre de usuario"
                                
                            />
                            <Form.Label>Clave</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputClave(e.target.value)}
                                required
                                type="password"
                                placeholder="******"
                                
                            />
                            <Form.Label>Confirmar clave</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputConfirmarClave(e.target.value)}
                                required
                                type="password"
                                placeholder="******"
                                
                            />
                            <Form.Label>Grupo</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputGrupo(e.target.value)}
                                required
                                as="select"
                            >
                                <option>Seleccione un grupo</option>
                                {
                                    state.listaDeGrupos.length > 0 &&
                                    state.listaDeGrupos.map(grupo => (
                                        <option
                                            key={grupo._id}
                                            value={grupo._id}
                                        >{grupo.nombre}</option>
                                    ))
                                }
                            </Form.Control>
                            <div className="col text-center">
                                <Button 
                                    type="submit"
                                    className="m-3 text-center"
                                    variant="success"
                                >Agregar</Button>
                                <Button 
                                    variant="danger"
                                    type="submit"
                                    className="m-3 text-center"
                                    onClick={() => history.goBack()}
                                >Cancelar</Button>
                            </div>
                        </Form.Group>
                    </form>
                }
            </Col>
        </Row>
    )
}

export default UsuarioForm