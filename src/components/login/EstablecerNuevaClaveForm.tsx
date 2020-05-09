import { NavLink, useParams } from 'react-router-dom'
import { Form , Button, Alert} from 'react-bootstrap'
import React, { useState, Fragment } from 'react'
import Axios from 'axios'
import { ResponseWithMessage } from '../../utils/types'

const EstablecerNuevaClaveForm = () => {
    const [ clave, setClave ] = useState('')
    const [ confirmarClave, setConfirmarClave ] = useState('')
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const { token } = useParams()


    const handleSubmit = async(e: Event): Promise<void> => {
        e.preventDefault()
        if (clave.length === 0) return
        if(clave !== confirmarClave){
            setError("Las claves no coinciden")
            return
        }
        const payload = { clave:  clave}
         try {
            let response: ResponseWithMessage = await Axios.put('/api/recuperar-clave', payload, {
                headers: {
                    'Authorization' : token
                }
            })
            
            setMessage(response.data.message)
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
        }

    }

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            <Form.Group>
                {
                    message &&
                    <Fragment>
                        <h2 className="modal-title m-3">Clave cambiada</h2>
                        <p>{message}</p>
                        <div className="col text-center">
                            <NavLink 
                                to="/auth"
                                className="btn btn-primary m-3 text-center"
                            >Volver.</NavLink>
                        </div>
                    </Fragment>
                }
                
                {
                    (!message ) &&
                    <Fragment>
                        <h2 className="modal-title m-3">Recuperar clave</h2>
                        {
                            error &&
                            <Fragment>
                                <Alert variant="danger">{error}</Alert>
                            </Fragment>
                        }
                        
                        <p>Ingrese el mail con el que se registró para reestablecer la clave. </p>
                        <Form.Label>Clave</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            onChange={(e: any) => setClave(e.target.value)}
                        />
                        <Form.Label>Confirmar clave ingresada</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            onChange={(e: any) => setConfirmarClave(e.target.value)}
                        />
                        <div className="col text-center">
                            <Button 
                                type="submit"
                                className="m-3 text-center"
                            >Cambiar clave</Button>
                        <NavLink 
                            to="/auth"
                            className="btn-link text-secondary text-center"
                        >Volver.</NavLink>
                        </div>
                    </Fragment>
                }
            </Form.Group>
        </form>
    )
}

export default EstablecerNuevaClaveForm