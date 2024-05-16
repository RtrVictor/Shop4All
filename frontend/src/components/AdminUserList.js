import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteUserAction } from '../actions/userActions'

const AdminUserList = ({ loading, users, error }) => {
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
      {error && <div className='alert-danger py-3 text-center'>{error}</div>}
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Table striped hover bordered>
        <thead style={{ position: 'sticky', top: '0' }}>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email address</th>
            <th>Admin</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fa-solid fa-lock-open green-icon'></i>
                  ) : (
                    <i className='fa-solid fa-lock red-icon'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/edit/${user._id}`}>
                    <Button className='btn btn-primary'>
                      <i className='fa-solid fa-user-pen'></i>
                    </Button>
                  </LinkContainer>

                  <span style={{ marginRight: '5px' }}></span>
                  <Button
                    className='btn btn-danger'
                    onClick={() => deleteUser(user._id)}
                  >
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
