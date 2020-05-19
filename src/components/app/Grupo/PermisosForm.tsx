import React, { Fragment, useContext, useState, useEffect } from 'react'
import { 
    Row, 
    Col, 
    Button,
    Alert,
    Form,
    Spinner
} from 'react-bootstrap'
import { listaDeAcciones } from '../../../utils/group-actions'
import { UserContext } from '../../../context/context'
import axios from 'axios'
import getConfig from '../../../utils/axiosConfig'
import { useHistory } from 'react-router-dom'

const PermisosForm = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const [ permisos, setPermisos ] = useState<string[]>([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ message, setMessage ] = useState('')

    useEffect(() => setPermisos([...state.grupoSeleccionado.acciones]), [])
    const CargarPermisosExistentes = (permiso: string): boolean => {
        const index = state.grupoSeleccionado.acciones.indexOf(permiso)
        const grupoPoseePermiso: boolean = index === -1 ? false : true
        /* if(grupoPoseePermiso) {
            setPermisos([...permisos, permiso])
        } */
        return grupoPoseePermiso
    }

    const AgregarPermiso = (permiso: string) => {
        const poseeElPermiso = permisos.indexOf(permiso)
        poseeElPermiso === -1 && setPermisos([...permisos, permiso])
    }
    const RemoverPermiso = (permiso: string) => {
        setPermisos(permisos.filter(x => x !== permiso))
    }

    const handleSubmit = async(e: Event) => {
        e.preventDefault()
        const payload = { acciones: permisos, _id: state.grupoSeleccionado._id }

        try {
            setIsLoading(true)
            let { data } = await axios.put('/api/admin/modificar-permisos', payload, getConfig(state.credentials.token))
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

    const [ error, setError ] = useState('')
    return(
        <Row className="m-0 justify-content-center align-items-center h-100">
            <Col xs={12} md={6} lg={3} className="border rounded-lg p-4 bg-light">
                {
                    message ?
                    <Fragment>
                        <h2 className="modal-title m-3">Modificar permisos</h2>
                        <p>{message}</p>
                        <div className="col text-center">
                            <Button 
                                variant="success"
                                onClick={() => history.goBack()}
                                className="text-center"
                            >Volver</Button>
                        </div>
                    </Fragment>  :
                    <form onSubmit={(e:any) => handleSubmit(e)}>
                        {
                            error &&
                            <Fragment>
                                <Alert variant="danger">{error}</Alert>
                            </Fragment>
                        }
                        {
                            listaDeAcciones.map(accion => (
                                <Form.Check 
                                    key={accion.value}
                                    type="checkbox" 
                                    label={accion.name}
                                    defaultChecked={CargarPermisosExistentes(accion.value)}
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement>) => 
                                            //Si el checkbox esta marcado entonces lo va a agregar, si esta desmarcado lo va a remover.
                                            e.target.checked ? AgregarPermiso(accion.value) : RemoverPermiso(accion.value)
                                    } 
                                />
                            ))
                        }
                    <div className="col text-center">
                        <Button 
                            type="submit"
                            className="m-3 text-center"
                            variant='success'
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
                                !isLoading && "Guardar"
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
                    </form>
                }
                
            </Col>
        </Row>
    )
}


export default PermisosForm