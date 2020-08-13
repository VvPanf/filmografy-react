import React, {Component} from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <Navbar.Brand href="/">Filmography</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">
                      <Link to={"add"} className="nav-link">Add Film</Link>
                      <Link to={"list"} className="nav-link">Film List</Link>
                </Nav>
            </Navbar>
        );
    }
}