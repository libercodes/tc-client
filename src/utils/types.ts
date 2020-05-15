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
    acciones: string[]
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
    accion: string,
    usuario: Usuario
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
    isLoading: boolean
}

export type Action =
    | { type: 'LOGIN'; payload: Credentials }
    | { type: 'LOGOUT'; payload: any }
    | { type: 'AGREGAR_USUARIO';  payload: Usuario }
    | { type: 'MODIFICAR_USUARIO'; payload: Usuario }
    | { type: 'ELIMINAR_USUARIO'; payload: Usuario }
    | { type: 'CONSULTAR_USUARIO'; payload: Usuario[] }
    | { type: 'AGREGAR_GRUPO'; payload: Grupo}
    | { type: 'MODIFICAR_GRUPO'; payload: Grupo }
    | { type: 'ELIMINAR_GRUPO'; payload: Grupo }
    | { type: 'CONSULTAR_GRUPO';payload: Grupo[] }
    | { type: 'CONSULTAR_MOVIMIENTO'; payload: Movimiento[] }
    | { type: 'CONSULTAR_SESION'; payload: Sesion[] }
    | { type: 'SELECCIONAR_GRUPO'; payload: Grupo }
    | { type: 'SELECCIONAR_USUARIO'; payload: Usuario }
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
