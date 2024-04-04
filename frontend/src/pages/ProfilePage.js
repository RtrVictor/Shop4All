import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateDetailsUser } from '../actions/userActions'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const login = useSelector((state) => state.login)
  const { user: loggedInUser } = login

  const updateUserDetails = useSelector((state) => state.updateUserDetails)
  const { user: updatedUser, success } = updateUserDetails

  useEffect(() => {
    if (!loggedInUser) {
      navigate(`/login`)
    } else {
      if (!user.name) {
        dispatch(detailsUser('profile'))
      } else {
        if (updatedUser) {
          setName(updatedUser.name)
          setEmail(updatedUser.email)
        } else {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }
  }, [navigate, dispatch, loggedInUser, user, updatedUser])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateDetailsUser({ id: user._id, name, email, password }))
    } else {
      setMessage('Passwords are not identical')
    }
  }

  return (
    <div>
      <h2>Account details</h2>
      <Row>
        {message && (
          <div className='alert-danger py-3 text-center'>{message}</div>
        )}
        {error && <div className='alert-danger py-3 text-center'>{error}</div>}
        {success && (
          <div className='alert alert-dismissible alert-success'>
            Account details updated
          </div>
        )}
        {loading && (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
      </Row>
      <Row md={2}>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
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
            </Col>
            <Col>
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
            </Col>
            <Col className='d-flex flex-column justify-content-end'>
              <Button type='submit'>Update</Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row md={9}>
        <h2>Here will be orders</h2>
      </Row>
    </div>
  )
}

export default ProfilePage
