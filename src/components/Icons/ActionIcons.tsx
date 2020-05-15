import styled from 'styled-components'
import React from 'react'
import { 
    Delete as DeleteMaterial,
    Visibility as VisibilityMaterial,
    Edit as EditMaterial,
    Security as SecurityMaterial,
    AccountCircle as AccountCircleMaterial,
    ExitToApp as ExitToAppMaterial
} from '@material-ui/icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

 const DeleteStyled = styled(DeleteMaterial)`
    cursor: pointer;
    :hover{
        fill: #DC3546;
    }
`
export const Delete = (props: any) => {
    return (
        <OverlayTrigger 
            placement="bottom"
            overlay={
                <Tooltip id={"delete"}>
                    Borrar
                </Tooltip>
            }
        >
            <DeleteStyled  {...props} />
        </OverlayTrigger>
    )
}


export const VisibilityStyled = styled(VisibilityMaterial)`
    cursor: pointer;
    :hover{
        fill: #007bff;
    }
`

export const Visibility = (props: any) => {
    return (
        <OverlayTrigger 
            placement="bottom"
            overlay={
                <Tooltip id={"consultar"}>
                    Consultar
                </Tooltip>
            }
        >
            <VisibilityStyled  {...props} />
        </OverlayTrigger>
    )
}

export const EditStyled = styled(EditMaterial)`
    cursor: pointer;
    :hover{
        fill: #ffc107;
    }
`
export const Edit = (props: any) => {
    return (
        <OverlayTrigger 
            placement="bottom"
            overlay={
                <Tooltip id={"Edit"}>
                    Editar
                </Tooltip>
            }
        >
            <EditStyled  {...props} />
        </OverlayTrigger>
    )
}

export const SecurityStyled = styled(SecurityMaterial)`
    cursor: pointer;
    :hover{
        fill: #007bff;
    }
`
export const Security = (props: any) => {
    return (
        <OverlayTrigger 
            placement="bottom"
            overlay={
                <Tooltip id={"Permisos"}>
                    Permisos
                </Tooltip>
            }
        >
            <SecurityStyled  {...props} />
        </OverlayTrigger>
    )
}


export const AccountCircle = styled(AccountCircleMaterial)`
    :hover{
        fill: #007bff;
    }
`
export const ExitToApp = styled(ExitToAppMaterial)`
    :hover{
        fill: #DC3546;
    }
`
