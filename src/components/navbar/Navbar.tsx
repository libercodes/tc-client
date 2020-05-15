import React, { useContext, useState, Fragment, SetStateAction, Dispatch } from 'react'
import {NavLink} from 'react-router-dom'
import {
    Navbar, 
    Nav, 
    NavDropdown,
    Button, 
} from 'react-bootstrap'
import { UserContext } from '../../context/context'
import { State } from '../../utils/types'
import Modal from '../Modal'
import { actions } from '../../reducers/userReducer'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import cookies from 'js-cookie'

type Props = {
    setOpenSideBar: Dispatch<SetStateAction<boolean>>
    openSideBar: boolean
}


const NavbarComponent = ({ setOpenSideBar, openSideBar }: Props) => {
        
    const state: State = useContext(UserContext).state
    const dispatch = useContext(UserContext).dispatch
    const [ showModal, setShowModal ] = useState(false)

    const CerrarSesion = async() => {
        await Axios.post('/api/logout',{},{
            headers: {
                'Authorization': state.credentials.token
            }
        })
        cookies.remove('token')
        dispatch({
            type: actions.LOGOUT
        })
    }
    
    return(
        <Fragment>
            {
                !state.isAuth && <Redirect to="/"/>
            }
            <Modal 
                show={showModal}
                title="Cerrar sesion"
                description="Desea cerrar sesion?"
                onCancel={() => setShowModal(false)}
                onAgree={CerrarSesion}
                nameAgreeButton={"Cerrar Sesion"}
            />
            <Navbar bg="light" expand="lg" className="border-bottom" >
                    <div className="mx-3 text-center">
                        <Button
                            onClick={() => setOpenSideBar(!openSideBar)}
                        >Menu</Button>
                    </div>
                    <Navbar.Brand href="/home">App panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {/* <Navbar.Text>
                            Usuario: {state.credentials.usuario.nombreDeUsuario}
                        </Navbar.Text> */}
                        <Nav>
                            <NavDropdown title={`Usuario: ${state.credentials.usuario.nombreDeUsuario}`} id="basic-nav-dropdown">
                                <NavDropdown.Item
                                    href="#"
                                >Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    href="#"
                                    onClick={() => setShowModal(true)}
                                >Cerrar Sesion</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}


export default NavbarComponent