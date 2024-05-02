import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Spinner, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction } from '../actions/userActions'

const AdminUserList = ({ loading, users }) => {
  const dispatch = useDispatch()

  const deleteUser = (id) => {
    if (
      window.confirm('Are you sure you want to permanently delete this user?')
    ) {
      dispatch(deleteUserAction(id))
    }
  }

  return (
    <div>
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Table striped hover bordered>
        <thead style={{ position: 'sticky', top: '0' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email address</th>
            <th>Admin</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fa-solid fa-lock-open green-icon'></i>
                  ) : (
                    <i className='fa-solid fa-lock red-icon'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button>
                      <i className='fa-solid fa-user-pen'></i>
                    </Button>
                  </LinkContainer>

                  <span style={{ marginRight: '5px' }}></span>
                  <Button variant='danger' onClick={() => deleteUser(user._id)}>
                    <i className='fa-solid fa-trash '></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminUserList
