import React, { useReducer, useMemo, useEffect, useState, Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import cookies from 'js-cookie'
//context 
import UserContextProvider from './context/context'
import { initialState, userReducer} from './reducers/userReducer'
//components
import Login from './components/login/Login'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/app/Home'
import Loader from './components/Loader'


const App = () => {
    const [ state, dispatch ] = useReducer(userReducer, initialState)
    const values = useMemo(() => ({
        state,
        dispatch
    }), [ state, dispatch ])

    useEffect(() => {
        const RecuperarSesion = async() => {
            dispatch( { type: 'SET_IS_LOADING', payload: true })
            if(!state.isAuth){
                const token = cookies.get('token')
                if(token){
                    try {
                        let response = await axios.get('/api/admin/obtener-usuario',{ 
                            headers: {
                                'Authorization' : token
                            }
                        })
                        console.log(response)
                        dispatch({
                            type: 'LOGIN',
                            payload: {
                                token: token,
                                usuario: response.data
                            }
                        })
                        
                    } catch (error) {
                        cookies.remove('token')
                        
                    }
                }
                dispatch({ type: "SET_IS_LOADING", payload: false})
            }
        }
        RecuperarSesion()
    }, [])


    return(
        <UserContextProvider value={values} >
            <Router>
                {
                    state.isLoading && <Loader />
                }
                <Container fluid className="bg-dark h-100">
                    <Route
                        path="/auth"
                        component={Login}
                    />
                    <PrivateRoute 
                        path='/'
                        exact
                        component={() => <Redirect to='/home'/>}
                        isAuth={state.isAuth}
                    />
                    <PrivateRoute 
                        path='/home'
                        component={Home}
                        isAuth={state.isAuth}
                    />
                </Container>
            </Router>
        </UserContextProvider>
    )
}

export default App