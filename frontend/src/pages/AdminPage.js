import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../actions/userActions'
import { Row } from 'react-bootstrap'
import AdminUserList from '../components/AdminUserList'

const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllUsers = useSelector((state) => state.getAllUsers)
  const { loading, users } = getAllUsers

  const login = useSelector((state) => state.login)
  const { user } = login

  const deleteUser = useSelector((state) => state.deleteUser)
  const { success: deleteSuccess } = deleteUser

  const updateUser = useSelector((state) => state.updateUser)
  const { success: updateSuccess } = updateUser

  useEffect(() => {
    //User needs to be an admin to see this screen
    if (user && user.isAdmin) {
      if (!users || users.length === 0 || updateSuccess || deleteSuccess) {
        dispatch(getAllUsersAction())
      }
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, user, deleteSuccess, updateSuccess])

  return (
    <div>
      <h3>Table of users</h3>
      <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminUserList users={users} loading={loading} />
      </Row>
      <h3>Table of Products</h3>
      {/* <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminUserList users={users} />
      </Row> */}
      <h3>Table of Orders</h3>
      {/* <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminUserList users={users} />
      </Row> */}
    </div>
  )
}

export default AdminPage
