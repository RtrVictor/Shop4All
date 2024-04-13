import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateDetailsUser } from '../actions/userActions'
import { loggedUserOrderAction } from '../actions/orderActions'

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

  const loggedUserOrder = useSelector((state) => state.loggedUserOrder)
  const {
    loading: loadingUserOrder,
    userOrder,
    error: errorUserOrder,
  } = loggedUserOrder

  useEffect(() => {
    if (!loggedInUser) {
      navigate(`/login`)
    } else {
      if (!user.name) {
        dispatch(detailsUser('profile'))
        dispatch(loggedUserOrderAction())
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
      <div className='separating-line'></div>
      <Row md={9}>
        <h2>Here are your orders</h2>
        {loadingUserOrder ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : errorUserOrder ? (
          <div className='alert-danger py-3 text-center'>{errorUserOrder}</div>
        ) : (
          <Table striped hover>
            <thead>
              <th>Order ID</th>
              <th>Ordered on</th>
              <th>Bill to Name</th>
              <th>Deliver to Name</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>Details</th>
            </thead>
            {
              <tbody>
                {userOrder &&
                  userOrder.map((order) => (
                    <tr>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{loggedInUser.name}</td>
                      <td>{loggedInUser.name}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <span
                            style={{
                              borderRadius: '0.25rem',
                              boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
                              padding: '0.25rem',
                            }}
                            className='bg-success '
                          >
                            Paid
                          </span>
                        ) : (
                          <span
                            style={{
                              borderRadius: '0.25rem',
                              boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
                              padding: '0.25rem',
                            }}
                            className='bg-danger'
                          >
                            Not paid
                          </span>
                        )}{' '}
                        {order.isDelivered ? (
                          <span
                            style={{
                              borderRadius: '0.25rem',
                              boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
                              padding: '0.25rem',
                            }}
                            className='bg-success'
                          >
                            Delivered
                          </span>
                        ) : (
                          <span
                            style={{
                              borderRadius: '0.25rem',
                              boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
                              padding: '0.25rem',
                            }}
                            className='bg-danger'
                          >
                            Not Delivered
                          </span>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button>View</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            }
          </Table>
        )}
      </Row>
    </div>
  )
}

export default ProfilePage
