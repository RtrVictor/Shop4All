import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserAction } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const EditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const updateUser = useSelector((state) => state.updateUser)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateUser
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'UPDATEUSER_RESET' })
      navigate('/admin/manager')
    } else {
      if (!user.name || user._id !== id) {
        dispatch(detailsUser(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, user, id, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAction({ _id: id, name, email, isAdmin }))
  }

  return (
    <div>
      <div>
        <Link to='/admin/manager' className='btn btn-light'>
          Go back
        </Link>
      </div>
      <FormContainer>
        <h1>Edit user profile</h1>
        {loadingUpdate && (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
        {errorUpdate && (
          <div className='alert-danger py-3 text-center'>{error}</div>
        )}
        {loading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : error ? (
          <div className='alert-danger py-3 text-center'>{error}</div>
        ) : (
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
              <Form.Label>Admin priviledge:</Form.Label>
              <Form.Check
                type='checkbox'
                placeholder='Make user admin'
                label='User is admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit'>Edit</Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default EditUserPage
