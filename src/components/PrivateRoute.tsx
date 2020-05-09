import { Redirect, Route } from 'react-router-dom'
import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'




interface Props extends RouteComponentProps {
    Component: FunctionComponent
    isAuth: boolean
    rest: any
}

//It is important that you make sure you pass the component in the component prop and not in a render method or as nested child.
const PrivateRoute = ({component: Component, isAuth, ...rest}: any) => {
    return (
      <Route
        {...rest}
        render={(props) => isAuth
          ? <Component {...props} />
          : <Redirect to='/auth' />}
      />
    )
}

export default PrivateRoute