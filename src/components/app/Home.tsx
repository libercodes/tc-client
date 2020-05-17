import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { Switch, Route } from 'react-router-dom'
import Grupo from './Grupo/Grupo'
import Usuario from './Usuario/Usuario'
import Sesion from './Sesion/Sesion'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import SideBar from '../navbar/SideBar'
import UsuarioForm from './Usuario/UsuarioForm'
import GrupoForm from './Grupo/GrupoForm'
const PageContentWrapper = styled(Col)`
    min-width: 0;
    width: 100%;
`
const SideBarWrapper = styled(Col)`
    min-height: 100vh !important;
    width:100%;
`
const Wrapper: any = styled.div`
    margin-left: ${(props: any) => props.show ? 0 : "-15%"};
    padding: 0;
    transition: margin 0.25s ease-out;
    width: 15%;
    @media (max-width: 768px){
        width: 50%;
        margin-left: ${(props: any) => props.show ? 0 : "-50%"};
    }
`

const Home = () => {
    const [ openSideBar, setOpenSideBar ] = useState(false);
    return(
        <Row className="h-100">
                
            <Wrapper show={openSideBar}>
                <div>
                    <SideBarWrapper className="bg-light p-0">
                        <SideBar/>
                    </SideBarWrapper>
                </div>
            </Wrapper>
            <PageContentWrapper  className="mx-0 px-0">
                <Navbar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}  />
                <div className="container-fluid px-0 h-75">
                    <Switch>

                        <Route
                            path="/home/grupos"
                            component={Grupo}
                            exact
                        />
                        <Route
                            path="/home/usuarios"
                            component={Usuario}
                            exact
                        />
                        <Route
                            path="/home/sesiones"
                            component={Sesion}
                        />
                        <Route  
                            path="/home/usuarios/agregar-usuario"
                            component={UsuarioForm}
                        />
                        <Route  
                            path="/home/usuarios/modificar-usuario/:id"
                            component={UsuarioForm}
                        />
                        <Route  
                            path="/home/usuarios/consultar-usuario/:id"
                            component={UsuarioForm}
                        />
                        <Route  
                            path="/home/usuarios/eliminar-usuario/:id"
                            component={UsuarioForm}
                        />
                        <Route  
                            path="/home/grupos/agregar-grupo/"
                            component={GrupoForm}
                        />
                        <Route  
                            path="/home/grupos/modificar-grupo/:id"
                            component={GrupoForm}
                        />
                        <Route  
                            path="/home/grupos/consultar-grupo/:id"
                            component={GrupoForm}
                        />
                        <Route  
                            path="/home/grupos/eliminar-grupo/:id"
                            component={GrupoForm}
                        />
                    </Switch>
                </div>
            </PageContentWrapper>
        </Row>
    )
}

export default Home