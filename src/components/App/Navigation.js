import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Translate } from 'react-redux-i18n'
import * as roles from '../../constants/roles'

const Navigation = ({ name, role, logout }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><Translate value="application.title" /></Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/">
          <NavItem><Translate value="tickets.title" /></NavItem>
        </LinkContainer>
        {
          role == roles.ADMIN &&
            <LinkContainer to="/users">
              <NavItem><Translate value="users.title" /></NavItem>
            </LinkContainer>
        }
      </Nav>

      <Nav pullRight>
        <NavDropdown title={name} id="current_user_dropdown">
          <MenuItem
            onClick={() => {
              logout()
            }}
          >
            <Translate value="sessions.logout" />
          </MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default Navigation
