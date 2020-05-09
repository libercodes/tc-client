import React, { useReducer, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//context 
import UserContextProvider from './context/context'
import { initialState, userReducer} from './reducers/userReducer'
//components
import Login from './components/login/Login'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/app/Home'




const App = () => {
    const [ state, dispatch ] = useReducer(userReducer, initialState)
    const values = useMemo(() => ({
        state,
        dispatch
    }), [ state, dispatch ])

    return(
        <UserContextProvider value={values} >
            <Router>
                <Container className="h-100 bg-dark">
                    <PrivateRoute 
                        path='/'
                        exact
                        component={Home}
                        isAuth={state.credentials.sesion_id}
                    />
                    <Route
                        path="/auth"
                        component={Login}
                    />
                </Container>
            </Router>
        </UserContextProvider>
    )
}

export default App