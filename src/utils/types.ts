import { RouteComponentProps } from 'react-router-dom'
import { AxiosResponse } from 'axios'

export  interface IProps extends RouteComponentProps { }

export interface Usuario {
    _id: string
    nombre: string
    apellido: string
    email: string
    nombreDeUsuario: string
    estado: string
    grupo: Grupo
}

export interface Grupo {
    _id: string
    nombre: string
    acciones: string[],
    __v?: any
}

export interface Sesion {
    _id: string
    usuario: any
    fechaDeInicio: any
    fechaDeFinalizacion: any
}

export interface Credentials {
    token: string
    usuario: {
        _id: string
        nombre: string
        apellido: string
        email: string
        nombreDeUsuario: string
        estado: string
        grupo: Grupo
    }
}

export interface Movimiento {
    _id: string
    fecha: Date,
    descripcion: string,
    usuario: {
        nombreDeUsuario: string
    }
}

export type State = {
    isAuth: boolean
    credentials: Credentials
    listaDeGrupos: Grupo[]
    listaDeUsuarios: Usuario[]
    listaDeMovimientos: Movimiento[]
    listaDeSesiones: Sesion[]
    usuarioSeleccionado: Usuario
    grupoSeleccionado: Grupo
    movimientoSeleccionado: Movimiento
    isLoading: boolean
}

export type Action =
    | { type: 'LOGIN'; payload: Credentials }
    | { type: 'LOGOUT'; payload: any }
    | { type: 'AGREGAR_USUARIO';  payload: Usuario }
    | { type: 'MODIFICAR_USUARIO'; payload: Usuario }
    | { type: 'ELIMINAR_USUARIO'; payload: string }
    | { type: 'LISTAR_USUARIOS'; payload: Usuario[] }
    | { type: 'AGREGAR_GRUPO'; payload: Grupo}
    | { type: 'MODIFICAR_GRUPO'; payload: Grupo }
    | { type: 'ELIMINAR_GRUPO'; payload: string }
    | { type: 'LISTAR_GRUPOS';payload: Grupo[] }
    | { type: 'LISTAR_MOVIMIENTOS'; payload: Movimiento[] }
    | { type: 'LISTAR_SESIONES'; payload: Sesion[] }
    | { type: 'SELECCIONAR_GRUPO'; payload: Grupo }
    | { type: 'SELECCIONAR_USUARIO'; payload: Usuario }
    | { type: 'SELECCIONAR_MOVIMIENTO'; payload: Movimiento }
    | { type: 'SET_IS_LOADING'; payload: boolean }




export interface IError extends Error {
    statusCode?: number,
    data?: any
}
    

export interface ResponseWithMessage extends AxiosResponse {
    data: {
        message: string
    }
}

