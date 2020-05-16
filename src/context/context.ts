import React from 'react'
import { State, Action } from '../utils/types';
import { initialState } from '../reducers/userReducer'
export interface IContext {
    state: State
    dispatch: React.Dispatch<Action>
}
const initialContext: IContext = {
    state: initialState,
    dispatch: () => {}
}

export const UserContext = React.createContext<IContext>(initialContext)

const UserContextProvider = UserContext.Provider;

export default UserContextProvider