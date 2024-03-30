import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { logoutUser } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const login = useSelector((state) => state.login)
  const { user } = login

  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Navbar collapseOnSelect expand='lg' className='bg-primary'>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand className='nav-link'>
              <i className='fas fa-shop px-1' />
              Shop4All
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {user ? (
                <NavDropdown
                  title={
                    <span>
                      <i className='fas fa-user px-1'></i>
                      {user.name}
                    </span>
                  }
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={'/login'}>
                  <Nav.Link className='nav-link'>
                    <i className='fas fa-user px-1'></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to={'/cart'}>
                <Nav.Link className='nav-link'>
                  <i className='fas fa-cart-shopping px-1' />
                  Shopping Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
