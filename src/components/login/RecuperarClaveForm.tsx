import { NavLink } from 'react-router-dom'
import { Form , Button, Alert} from 'react-bootstrap'
import React, { useState, Fragment } from 'react'
import Axios from 'axios'
import { ResponseWithMessage } from '../../utils/types'

const RecuperarClaveForm = () => {
    const [ email, setEmailInput ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState('')


    const handleSubmit = async(e: Event): Promise<void> => {
        e.preventDefault()
        if (email.length === 0) return

        const payload = { email: email }
        
        try {
            let response: ResponseWithMessage = await Axios.post('/api/recuperar-clave', payload)
            setMessage(response.data.message)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form onSubmit={(e: any) => handleSubmit(e)}>
            <Form.Group>
                {
                    message &&
                    <Fragment>
                        <h2 className="modal-title m-3">Solicitud enviada</h2>
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
                    error &&
                    <Fragment>
                        <Alert variant="danger">{error}</Alert>
                        <div className="col text-center">
                            <NavLink 
                                to="/auth"
                                className="btn btn-primary m-3 text-center"
                            >Volver.</NavLink>
                        </div>
                    </Fragment>

                }
                {
                    (!message && !error) &&
                    <Fragment>
                        <h2 className="modal-title m-3">Recuperar clave</h2>
                        <p>Ingrese el mail con el que se registró para reestablecer la clave. </p>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type="email" 
                            placeholder="ejemplo@email.com" 
                            onChange={(e: any) => setEmailInput(e.target.value)}
                        />
                        <div className="col text-center">
                            <Button 
                                type="submit"
                                className="m-3 text-center"
                            >Recuperar clave</Button>
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

export default RecuperarClaveForm