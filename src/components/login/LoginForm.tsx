import { NavLink, Redirect } from 'react-router-dom'
import { Form , Button, Alert} from 'react-bootstrap'
import React, { useState, FunctionComponent, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/context'
import { actions } from '../../reducers/userReducer'



const LoginForm: FunctionComponent = (props) => {
    const { state, dispatch } = useContext(UserContext)
    const [ usuarioInput, setUsuarioInput ] = useState('')
    const [ claveInput, setClaveInput ] = useState('')
    const [ error, setError ] = useState('')

    const handleLogin = async(e: Event): Promise<void> => {
        e.preventDefault()
        const payload = { nombreDeUsuario: usuarioInput, clave: claveInput }
        try {
            let response = await axios.post('/api/login', payload)

            dispatch({
                type: actions.LOGIN,
                payload: response.data
            })

        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
        } 

    }

    return (
        <form onSubmit={(e: any) => handleLogin(e)}>
            <Form.Group>
                {
                    state.credentials.sesion_id &&
                    <Redirect to="/" />
                }
                <h2 className="modal-title m-3">Inicio de sesion</h2>
                {
                    error &&
                    <Alert variant="danger">{error}</Alert>
                }
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    required
                    type="text" 
                    placeholder="Usuario" 
                    onChange={e => {
                        setUsuarioInput(e.target.value)
                        setError('')
                    }}
                />
                <Form.Label>Clave</Form.Label>
                <Form.Control 
                    required
                    type="password" 
                    placeholder="*******" 
                    onChange={e => setClaveInput(e.target.value)}
                />
                <div className="col text-center">
                    <Button 
                        type="submit"
                        className="m-3 text-center"
                    >Iniciar Sesion</Button>
                </div>
                <NavLink 
                    to="/auth/recuperar-clave"
                    className="btn-link text-secondary"
                >¿Ha olvidado su contraseña? Haz click aqui.</NavLink>
            </Form.Group>
        </form>
    )
}
export default LoginForm