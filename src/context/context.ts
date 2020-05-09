import React from 'react'
interface IContext {
    state: any
    dispatch: any
}
const initialContext: IContext = {
    state: {},
    dispatch: () => {}
}

export const UserContext = React.createContext<IContext>(initialContext)

const UserContextProvider = UserContext.Provider;

export default UserContextProvider