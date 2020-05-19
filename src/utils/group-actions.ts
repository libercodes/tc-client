import { useContext } from "react"

export const objetoAcciones = {
    GESTIONAR_USUARIO: {
        AGREGAR_USUARIO: "AGREGAR_USUARIO",
        MODIFICAR_USUARIO: "MODIFICAR_USUARIO",
        ELIMINAR_USUARIO: "ELIMINAR_USUARIO",
        LISTAR_USUARIOS: "LISTAR_USUARIOS"
    },
    GESTIONAR_GRUPO: {
        AGREGAR_GRUPO: "AGREGAR_GRUPO",
        MODIFICAR_GRUPO: "MODIFICAR_GRUPO",
        ELIMINAR_GRUPO: "ELIMINAR_GRUPO",
        LISTAR_GRUPOS: "LISTAR_GRUPOS"
    },
    GESTIONAR_MOVIMIENTO: {
        LISTAR_MOVIMIENTOS: "LISTAR_MOVIMIENTOS"
    },
    GESTIONAR_SESION: {
        LISTAR_SESIONES: "LISTAR_SESIONES"
    }

}
export const listaDeAcciones = [
    {
        name: "Agregar usuarios",
        value: "AGREGAR_USUARIO"
    },
    {
        name: "Modificar usuarios",
        value: "MODIFICAR_USUARIO"
    },
    {
        name: "Eliminar usuarios",
        value: "ELIMINAR_USUARIO"
    },
    {
        name: "Listar usuarios",
        value: "LISTAR_USUARIOS"
    },
    {
        name: "Agregar grupo",
        value: "AGREGAR_GRUPO"
    },
    {
        name: "Modificar grupo",
        value: "MODIFICAR_GRUPO"
    },
    {
        name: "Eliminar grupo",
        value: "ELIMINAR_GRUPO"
    },
    {
        name: "Listar grupos",
        value: "LISTAR_GRUPOS"
    },
    {
        name: "Listar movimientos",
        value: "LISTAR_MOVIMIENTOS"
    },
    {
        name: "Listar sesiones",
        value: "LISTAR_SESIONES"
    },
    
]

