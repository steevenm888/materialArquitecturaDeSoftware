import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Client from './Client/Client';
import Product from './Product/Product';
import Campaign from './Campaign/Campaign'
import ContactabilityRegistration from "./ContactabilityRegistration/CantactabilityRegistration";

class Navigation extends React.Component {

    render() {
        return (
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">Banquito</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link><Link to="/clients">Clientes</Link></Nav.Link>
                        <Nav.Link><Link to="/products">Productos</Link></Nav.Link>
                        <NavDropdown title="Campañas" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/campaigns">Creacion de Campañas</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/ContactabilityRegistration">Registro de Contactabilidad</Link></NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/clients">
                        <Client />
                    </Route>
                    <Route path="/products">
                        <Product />
                    </Route>
                    <Route path="/campaigns">
                        <Campaign />
                    </Route>
                    <Route path="/ContactabilityRegistration">
                        <ContactabilityRegistration />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Navigation;