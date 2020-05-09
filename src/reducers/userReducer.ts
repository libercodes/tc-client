import { Action, State } from "../utils/types"

export const actions = {
    GESTIONAR_USUARIO: {
        AGREGAR_USUARIO: "AGREGAR_USUARIO",
        MODIFICAR_USUARIO: "MODIFICAR_USUARIO",
        ELIMINAR_USUARIO: "ELIMINAR_USUARIO",
        CONSULTAR_USUARIO: "CONSULTAR_USUARIO"
    },
    GESTIONAR_GRUPO: {
        AGREGAR_GRUPO: "AGREGAR_GRUPO",
        MODIFICAR_GRUPO: "MODIFICAR_GRUPO",
        ELIMINAR_GRUPO: "ELIMINAR_GRUPO",
        CONSULTAR_GRUPO: "CONSULTAR_GRUPO"
    },
    GESTIONAR_MOVIMIENTO: {
        CONSULTAR_MOVIMIENTO: "CONSULTAR_MOVIMIENTO"
    },
    GESTIONAR_SESION: {
        CONSULTAR_SESION: "CONSULTAR_SESION"
    },
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"

}

//export const initialState: State = {}
 export const initialState: State = {
    credentials: {
        sesion_id: '',
        nombreDeUsuario:  '',
        id: '',
        token: '',
        grupo: {
            _id: '',
            nombre: '',
            acciones: []
        }
    },
    listaDeGrupos: [],
    listaDeUsuarios: [],
    listaDeMovimientos: [],
    listaDeSesiones: [],
}




export const userReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case actions.LOGIN:
            return {
                ...state,
                credentials: { ...action.payload }
            }
        case actions.LOGOUT:
            return {
                ...state,
                credentials: {
                    sesion_id: '',
                    token: '',
                    id: '',
                    nombreDeUsuario: '',
                    grupo: {
                        nombre: '',
                        _id: '',
                        acciones: []
                    }
                }
            }
        case actions.GESTIONAR_USUARIO.CONSULTAR_USUARIO: 
            return {
                ...state,
                listaDeUsuarios: [...action.payload]
            }
        case actions.GESTIONAR_USUARIO.AGREGAR_USUARIO:
            return {
                ...state,
                listaDeUsuarios: [
                    ...state.listaDeUsuarios, action.payload
                ]
            }
        case actions.GESTIONAR_USUARIO.MODIFICAR_USUARIO:
            return {
                ...state,
                listaDeUsuarios: state.listaDeUsuarios.map(usuario => 
                    usuario._id === action.payload._id ? action.payload : usuario
                )
            }
        case actions.GESTIONAR_USUARIO.ELIMINAR_USUARIO:
            return {
                ...state,
                listaDeUsuarios: state.listaDeUsuarios.filter(usuario =>
                    usuario._id !== action.payload._id
                )
            }
        case actions.GESTIONAR_GRUPO.CONSULTAR_GRUPO:
            return {
                ...state,
                listaDeGrupos: [...action.payload]
            }
        case actions.GESTIONAR_GRUPO.AGREGAR_GRUPO:
            return {
                ...state,
                listaDeGrupos: [
                    ...state.listaDeGrupos, action.payload
                ]
            }
        case actions.GESTIONAR_GRUPO.MODIFICAR_GRUPO:
            return {
                ...state,
                listaDeGrupos: state.listaDeGrupos.map(grupo => 
                    grupo._id === action.payload._id ? action.payload : grupo
                )
            }
        case actions.GESTIONAR_GRUPO.ELIMINAR_GRUPO:
            return {
                ...state,
                listaDeGrupos: state.listaDeGrupos.filter(grupo =>
                    grupo._id !== action.payload._id    
                )
            }
        case actions.GESTIONAR_MOVIMIENTO.CONSULTAR_MOVIMIENTO:
            return {
                ...state,
                listaDeMovimientos: [...action.payload]
            }
        case actions.GESTIONAR_SESION.CONSULTAR_SESION:
            return {
                ...state,
                listaDeSesiones: [...action.payload]
            }
        default:
            return state
    }
}