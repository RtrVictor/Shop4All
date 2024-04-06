import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ProgressBar = ({ s1, s2, s3, s4 }) => {
  return (
    <Nav className='justify-content-center mb-4 py-3'>
      <Nav.Item>
        {s1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='special-nav-link'>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='special-nav-link-disabled'>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ display: 'flex', alignItems: 'center' }}>
        <i className='fa-solid fa-arrow-right'></i>
      </Nav.Item>

      <Nav.Item>
        {s2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='special-nav-link'>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='special-nav-link-disabled'>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ display: 'flex', alignItems: 'center' }}>
        <i className='fa-solid fa-arrow-right'></i>
      </Nav.Item>

      <Nav.Item>
        {s3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='special-nav-link'>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='special-nav-link-disabled'>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ display: 'flex', alignItems: 'center' }}>
        <i className='fa-solid fa-arrow-right'></i>
      </Nav.Item>

      <Nav.Item>
        {s4 ? (
          <LinkContainer to='/putOrder'>
            <Nav.Link className='special-nav-link'>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='special-nav-link-disabled'>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default ProgressBar
