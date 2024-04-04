import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const register = useSelector((state) => state.register)
  const { loading, user, error } = register

  useEffect(() => {
    if (user) {
      navigate(redirect)
    }
  }, [navigate, user, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(registerUser(name, email, password))
    } else {
      setMessage('Passwords are not identical')
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && (
        <div className='alert-danger py-3 text-center'>{message}</div>
      )}
      {error && <div className='alert-danger py-3 text-center'>{error}</div>}
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='name'
            placeholder='Add Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group>
          <Form.Label>Confirm password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit'>Register</Button>
      </Form>
      <Row>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage
