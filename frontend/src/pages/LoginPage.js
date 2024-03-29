import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const login = useSelector((state) => state.login)
  const { loading, user, error } = login

  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [navigate, user, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <div className='alert-danger py-3 text-center'>{error}</div>}
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Add Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Add Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit'>Sign In</Button>
      </Form>
      <Row>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage
