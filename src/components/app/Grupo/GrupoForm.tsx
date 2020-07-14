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


const GrupoForm: FunctionComponent = (props) => {

    
    const [ inputNombre, setInputNombre ] = useState('')

    const [ buttonTitle, setButtonTitle ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ modo, setModo ] = useState('')
    const [ title, setTitle ] = useState('')
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    
    useEffect(() => {
        if (location.pathname === "/home/grupos/agregar-grupo") {
            setModo('A')
            setTitle('Grupo Agregado.')
            setButtonTitle('Agregar')
        } else if (location.pathname.includes("/home/grupos/modificar-grupo")) {
            setModo('M')
            setInputNombre(state.grupoSeleccionado.nombre)
            setTitle('Grupo Modificado.')
            setButtonTitle('Guardar')
        } else if (location.pathname.includes("/home/grupos/consultar-grupo")) {
            setModo('C')
            setInputNombre(state.grupoSeleccionado.nombre)
        } else if (location.pathname.includes("/home/grupos/eliminar-grupo")) {
            setModo('B')
            setInputNombre(state.grupoSeleccionado.nombre)
            setTitle('Grupo Eliminado.')
            setButtonTitle('Eliminar')
        }
    }, [])


    useEffect(() => {
        const getGrupos = async() => {
            let { data } = await axios.get('/api/admin/consultar-grupo', axiosConfig(state.credentials.token))
            dispatch({
                type: 'LISTAR_GRUPOS',
                payload: data
            })
        }
        getGrupos()
    }, [])



    const handleModificarGrupo = async (e: Event): Promise<void> => {
        e.preventDefault()
        const payload = {
            nombre: inputNombre,
            _id: state.grupoSeleccionado._id
        }
        try {
            setIsLoading(true)
            let { data } = await axios.put('/api/admin/modificar-grupo', payload, axiosConfig(state.credentials.token))
            dispatch({
                type: 'MODIFICAR_GRUPO',
                payload: data.grupo
            })
            setMessage(data.message)
        } catch (error) {
            setError(error.response.data.error)
        }
        setIsLoading(false)
    }

    const handleAgregarGrupo = async (e: Event): Promise<void> => {
        e.preventDefault()
        const payload = {
            nombre: inputNombre
        }
        try {
            setIsLoading(true)
            let { data } = await axios.post('/api/admin/agregar-grupo', payload, axiosConfig(state.credentials.token))
            dispatch({
                type: 'AGREGAR_GRUPO',
                payload: data.grupo
            })
            setMessage(data.message)
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        }
        setIsLoading(false)
    }

    const handleEliminarUsuario = async(e: Event) => {
        e.preventDefault()
        try {
            let { data } = await axios.delete(`/api/admin/eliminar-grupo/${state.grupoSeleccionado._id}`, axiosConfig(state.credentials.token))
            dispatch({
                type: 'ELIMINAR_GRUPO',
                payload: data.grupo_id
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
                        if(modo==="A"){
                            handleAgregarGrupo(e)
                        } else if( modo === "M") {
                            handleModificarGrupo(e)
                        } else if( modo === "B"){
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
                            <Form.Label>Nombre del grupo</Form.Label>
                            <Form.Control 
                                onChange={(e: any) => setInputNombre(e.target.value)}
                                required={ modo!=="B" }
                                type="text"
                                placeholder="Nombre"
                                disabled= { modo === "C" || modo === "B" }
                                value={inputNombre}
                                
                            />
                            {
                                (modo === "A" || modo === "M" || modo ===  "B" ) &&
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
                                                    type="submit"
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

export default GrupoForm