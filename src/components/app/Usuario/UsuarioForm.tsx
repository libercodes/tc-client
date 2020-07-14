import React, { FunctionComponent, useContext, useEffect, useState, Fragment } from 'react'
import { 
    Form, 
    Button ,
    Row,
    Col,
    Alert,
    Spinner
} from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext  } from '../../../context/context'
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
    const [ inputEstado, setInputEstado ] = useState('')

    const [ buttonTitle, setButtonTitle ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ modo, setModo ] = useState('')
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    
    useEffect(() => {
        const getGrupos = async() => {
            let { data } = await axios.get('/api/admin/listar-grupos', axiosConfig(state.credentials.token))
            dispatch({
                type: 'LISTAR_GRUPOS',
                payload: data
            })
        }

        if (location.pathname === "/home/usuarios/agregar-usuario") {
            setModo('A')
            setTitle('Usuario agregado')
            setButtonTitle('Agregar')
            getGrupos()
        } else if (location.pathname.includes("/home/usuarios/modificar-usuario")) {
            setModo('M')
            setButtonTitle('Guardar')
            setTitle('Usuario modificado')
            setInputNombre(state.usuarioSeleccionado.nombre)
            setInputApellido(state.usuarioSeleccionado.apellido)
            setInputEmail(state.usuarioSeleccionado.email)
            setInputNombreDeUsuario(state.usuarioSeleccionado.nombreDeUsuario)
            setInputGrupo(state.usuarioSeleccionado.grupo._id)
            setInputEstado(state.usuarioSeleccionado.estado)
            getGrupos()
        } else if (location.pathname.includes("/home/usuarios/consultar-usuario")) {
            setModo('C')
            setInputNombre(state.usuarioSeleccionado.nombre)
            setInputApellido(state.usuarioSeleccionado.apellido)
            setInputEmail(state.usuarioSeleccionado.email)
            setInputNombreDeUsuario(state.usuarioSeleccionado.nombreDeUsuario)
            setInputGrupo(state.usuarioSeleccionado.grupo._id)
            setInputEstado(state.usuarioSeleccionado.estado)
        } else if (location.pathname.includes("/home/usuarios/eliminar-usuario/")) {
            setModo('B')
            setButtonTitle('Eliminar')
            setTitle('Usuario eliminado')
            setInputNombre(state.usuarioSeleccionado.nombre)
            setInputApellido(state.usuarioSeleccionado.apellido)
            setInputEmail(state.usuarioSeleccionado.email)
            setInputNombreDeUsuario(state.usuarioSeleccionado.nombreDeUsuario)
            setInputGrupo(state.usuarioSeleccionado.grupo._id)
            setInputEstado(state.usuarioSeleccionado.estado)
        }
    }, [])
    const handleModificarUsuario = async (e: Event): Promise<void> => {
        e.preventDefault()
        const payload = {
            _id: state.usuarioSeleccionado._id,
            nombre: inputNombre,
            apellido: inputApellido,
            email: inputEmail,
            nombreDeUsuario: inputNombreDeUsuario,
            grupo: inputGrupo,
            estado: inputEstado
        }
        try {
            setIsLoading(true)
            let { data } = await axios.put('/api/admin/modificar-usuario', payload, axiosConfig(state.credentials.token))
            dispatch({
                type: "MODIFICAR_USUARIO",
                payload: data.usuario
            })
            setMessage(data.message)
        } catch (error) {
            setError(error.response.data.error)
        }
        setIsLoading(false)
    }

    const handleAgregarUsuario = async (e: Event): Promise<void> => {
        e.preventDefault()
        if(inputConfirmarClave !== inputConfirmarClave) setError("Las claves no coinciden")
        const payload = {
            nombre: inputNombre,
            apellido: inputApellido,
            email: inputEmail,
            nombreDeUsuario: inputNombreDeUsuario,
            clave: inputClave,
            grupo: inputGrupo
        }
        try {
            setIsLoading(true)
            let { data } = await axios.post('/api/admin/agregar-usuario', payload, axiosConfig(state.credentials.token))
            dispatch({
                type: 'AGREGAR_USUARIO',
                payload: data.usuario
            })
            setMessage(data.message)
        } catch (error) {
            setError(error.response.data.error)
        }
        setIsLoading(false)
    }
    const handleEliminarUsuario = async(e: Event) => {
        e.preventDefault()
        try {
            let { data } = await axios.delete(`/api/admin/eliminar-usuario/${state.usuarioSeleccionado._id}`, axiosConfig(state.credentials.token))
            dispatch({
                type: "ELIMINAR_USUARIO",
                payload: data.usuario_id
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
                        <h2 className="modal-title m-3">{title}</h2>
                        <p>{message}</p>
                        <div className="col text-center">
                            <Button 
                                variant="success"
                                onClick={() => history.goBack()}
                                className="text-center"
                            >Volver</Button>
                        </div>
                    </Fragment> :
                    <form onSubmit={(e: any) => {
                        if( modo === "A" ){
                            handleAgregarUsuario(e)
                        } else if( modo === "M" ) {
                            handleModificarUsuario(e)
                        } else if ( modo === "B" ) {
                            handleEliminarUsuario(e)
                        } else {
                            e.preventDefault()
                        }
                    }}>
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
                                required={modo!=="B"}
                                type="text"
                                minLength={2}
                                maxLength={30}
                                placeholder="Nombre"
                                disabled= { modo === "C" || modo === "B" }
                                value={inputNombre}
                                
                            />
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputApellido(e.target.value)}
                                required={modo!=="B"}
                                type="text"
                                minLength={2}
                                maxLength={30}
                                placeholder="Apellido"
                                disabled= { modo === "C" || modo === "B" }
                                value={inputApellido}
                                
                            />
                            <Form.Label>email</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputEmail(e.target.value)}
                                required={modo!=="B"}
                                type="email"
                                placeholder="email@ejemplo.com"
                                disabled= { modo === "C" || modo === "B"}
                                value={inputEmail}
                                
                            />
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputNombreDeUsuario(e.target.value)}
                                required={modo!=="B"}
                                type="text"
                                minLength={4}
                                maxLength={30}
                                placeholder="nombre de usuario"
                                disabled= { modo === "C" || modo === "B" }
                                value={inputNombreDeUsuario}
                                
                            />
                            {
                                modo === "A"  &&
                                    <Fragment>
                                        <Form.Label>Clave</Form.Label>
                                        <Form.Control 
                                            onChange={(e: any) => setInputClave(e.target.value)}
                                            required={modo==="A"}
                                            type="password"
                                            placeholder="******"
                                            minLength={6}
                                            maxLength={24}
                                        />
                                        <Form.Label>Confirmar clave</Form.Label>
                                        <Form.Control 
                                            onChange={(e: any) => setInputConfirmarClave(e.target.value)}
                                            required={modo==="A"}
                                            type="password"
                                            placeholder="******"
                                            minLength={6}
                                            maxLength={24}
                                        />
                                    </Fragment>
                            }
                            {
                                (modo === "M" || modo === "C" || modo === "B") &&
                                    <Fragment>
                                        
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control
                                            as="select"
                                            required
                                            onChange={(e: any) => setInputEstado(e.target.value)}
                                            disabled= { modo === "C" || modo === "B" }
                                            value={inputEstado}
                                        >
                                            <option>Activo</option>
                                            <option>Inactivo</option>
                                            <option>Nuevo</option>

                                        </Form.Control>
                                    </Fragment>
                            }
                            <Form.Label>Grupo</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputGrupo(e.target.value)}
                                required={modo!=="B"}
                                as="select"
                                disabled= { modo === "C" || modo === "B" }
                                value={inputGrupo}
                                
                            >
                                <option>Seleccione un grupo</option>
                                {
                                    modo==="C" &&
                                    <option
                                        value={state.usuarioSeleccionado.grupo._id}
                                    >{state.usuarioSeleccionado.grupo.nombre}</option>
                                }
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
                            {
                                (modo === "A" || modo === "M" || modo ==="B") &&
                                    <div className="col text-center">
                                        <Button 
                                            type="submit"
                                            className="m-3 text-center"
                                            variant={modo === 'B' ? 'danger' : 'success'}
                                        >
                                            {
                                                isLoading && 
                                                <Spinner 
                                                as="span"
                                                animation="border"
                                                variant="light"
                                                size="sm"
                                                />
                                                
                                            }
                                            {
                                                !isLoading && buttonTitle
                                            }
                                        </Button>
                                        {
                                            !isLoading && 
                                                <Button 
                                                    variant="secondary"
                                                    className="m-3 text-center"
                                                    onClick={() => history.goBack()}
                                                >
                                                    Cancelar
                                                </Button>
                                        }
                                    </div>
                            }
                            {
                                modo === "C" &&
                                <Col className="text-center">
                                    <Button
                                        variant="primary"
                                        className="m-3 text-ceter"
                                        onClick={() => history.goBack()}
                                    >
                                        Volver
                                    </Button>
                                </Col>
                            }

                        </Form.Group>
                    </form>
                }
            </Col>
        </Row>
    )
}

export default UsuarioForm