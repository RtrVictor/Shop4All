import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../actions/userActions'
import { Row } from 'react-bootstrap'
import AdminUserList from '../components/AdminUserList'
import AdminProductList from '../components/AdminProductList'
import { listOfProducts } from '../actions/productActions'

const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllUsers = useSelector((state) => state.getAllUsers)
  const { loading, users, error } = getAllUsers

  const login = useSelector((state) => state.login)
  const { user } = login

  const deleteUser = useSelector((state) => state.deleteUser)
  const { success: deleteUserSuccess } = deleteUser

  const updateUser = useSelector((state) => state.updateUser)
  const { success: updateUserSuccess } = updateUser

  const productList = useSelector((state) => state.productList)
  const { loading: productLoading, products, error: productError } = productList

  const deleteProduct = useSelector((state) => state.deleteProduct)
  const { success: deleteProductSuccess } = deleteProduct

  useEffect(() => {
    //User needs to be an admin to see this screen
    if (user && user.isAdmin) {
      if (
        !users ||
        users.length === 0 ||
        updateUserSuccess ||
        deleteUserSuccess
      ) {
        dispatch(getAllUsersAction())
      }
      if (!products || products.length === 0 || deleteProductSuccess) {
        dispatch(listOfProducts())
      }
    } else {
      navigate('/login')
    }
  }, [
    dispatch,
    navigate,
    user,
    updateUserSuccess,
    deleteUserSuccess,
    deleteProductSuccess,
  ])

  return (
    <div>
      <h3>Table of users</h3>
      <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminUserList users={users} loading={loading} error={error} />
      </Row>
      <h3>Table of Products</h3>

      <Row>
        <AdminProductList
          products={products}
          loading={productLoading}
          error={productError}
        />
      </Row>

      <h3>Table of Orders</h3>
      {/* <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminUserList users={users} />
      </Row> */}
    </div>
  )
}

export default AdminPage
