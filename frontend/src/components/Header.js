import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
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
              <LinkContainer to={'/login'}>
                <Nav.Link className='nav-link'>
                  <i className='fas fa-user px-1'></i>Login
                </Nav.Link>
              </LinkContainer>
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
