import { Action, State } from "../utils/types"

export const actions = {
    GESTIONAR_USUARIO: {
        OBTENER_USUARIO: "OBTENER_USUARIO",
        AGREGAR_USUARIO: "AGREGAR_USUARIO",
        MODIFICAR_USUARIO: "MODIFICAR_USUARIO",
        ELIMINAR_USUARIO: "ELIMINAR_USUARIO",
        CONSULTAR_USUARIO: "LISTAR_USUARIOS"
    },
    GESTIONAR_GRUPO: {
        AGREGAR_GRUPO: "AGREGAR_GRUPO",
        MODIFICAR_GRUPO: "MODIFICAR_GRUPO",
        ELIMINAR_GRUPO: "ELIMINAR_GRUPO",
        CONSULTAR_GRUPO: "LISTAR_GRUPOS"
    },
    GESTIONAR_MOVIMIENTO: {
        CONSULTAR_MOVIMIENTO: "LISTAR_MOVIMIENTOS"
    },
    GESTIONAR_SESION: {
        CONSULTAR_SESION: "LISTAR_SESIONES"
    },
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SELECCIONAR_GRUPO: "SELECCIONAR_GRUPO",
    SELECCIONAR_USUARIO: "SELECCIONAR_USUARIO",
    SELECCIONAR_MOVIMIENTO: 'SELECCIONAR_MOVIMIENTO',
    SET_IS_LOADING: "SET_IS_LOADING"

}

//export const initialState: State = {}
 export const initialState: State = {
    isAuth: false,
    credentials: {
        token: '',
        usuario: {
            _id: '',
            nombre: '',
            apellido: '',
            email: '',
            nombreDeUsuario: '',
            estado: '',
            grupo: {
                _id: '',
                nombre: '',
                acciones: []
            }
        }
    },
    listaDeGrupos: [],
    listaDeUsuarios: [],
    listaDeMovimientos: [],
    listaDeSesiones: [],
    grupoSeleccionado: {
        _id: '',
        nombre: '',
        acciones: []
    },
    usuarioSeleccionado: {
        _id: '',
        nombre: '',
        apellido: '',
        email: '',
        nombreDeUsuario: '',
        estado: '',
        grupo: {
            _id: '',
            nombre: '',
            acciones: []
        }
    },
    movimientoSeleccionado: {
        _id: '',
        fecha: new Date(),
        descripcion: ``,
        usuario: {
            nombreDeUsuario: ''
        }
    },
    isLoading: false
}



export const userReducer = (state: State, action: Action): State => {
    const ValidateAuth = (): boolean => (state.credentials.token != null && state.credentials.usuario._id != null) ? true : false
    switch(action.type) {
        case actions.LOGIN:
            return {
                ...state,
                credentials: { ...action.payload },
                isAuth: true
            }
        case actions.GESTIONAR_USUARIO.OBTENER_USUARIO:
            return {
                ...state,
                credentials: { ...action.payload},
                isAuth: true
            }
        case actions.LOGOUT:
            return {
                ...state,
                credentials: {
                    token: '',
                    usuario: {
                        _id: '',
                        nombre: '',
                        apellido: '',
                        email: '',
                        nombreDeUsuario: '',
                        estado: '',
                        grupo: {
                            _id: '',
                            nombre: '',
                            acciones: []
                        }
                    }
                },
                isAuth: false
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
                    usuario._id !== action.payload
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
                    grupo._id !== action.payload    
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
        case actions.SELECCIONAR_GRUPO: 
            return {
                ...state,
                grupoSeleccionado: action.payload
            }
        case actions.SELECCIONAR_USUARIO: 
            return {
                ...state,
                usuarioSeleccionado: action.payload
            }
        case actions.SELECCIONAR_MOVIMIENTO:
            return {
                ...state,
                movimientoSeleccionado: action.payload
            }
        case actions.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}