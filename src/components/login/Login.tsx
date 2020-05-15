import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { IProps } from '../../utils/types'
import LoginForm from './LoginForm'
import RecuperarClaveForm from './RecuperarClaveForm'
import EstablecerNuevaClaveForm from './EstablecerNuevaClaveForm'

const Login = (prop: IProps) => {
    return(
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xs-12 col-md-6 col-lg-3 border rounded-lg p-4 bg-light">
                <Switch>
                    <Route
                        component={LoginForm}
                        path="/auth"
                        exact
                    />
                    <Route
                        component={RecuperarClaveForm}
                        path="/auth/recuperar-clave"
                    />
                    <Route
                        component={EstablecerNuevaClaveForm}
                        path="/auth/establecer_clave/:token"
                    />
                </Switch>   
            </div>
        </div>
    )
}

export default Login