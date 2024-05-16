import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../actions/userActions'
import { Row } from 'react-bootstrap'
import AdminUserList from '../components/AdminUserList'
import AdminProductList from '../components/AdminProductList'
import { listOfProducts } from '../actions/productActions'
import { orderListAction } from '../actions/orderActions'
import AdminOrderList from '../components/AdminOrderList'

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

  const orderList = useSelector((state) => state.orderList)
  const { loading: orderLoading, orders, error: orderError } = orderList

  const deleteOrder = useSelector((state) => state.deleteOrder)
  const { success: deleteOrderSuccess } = deleteOrder

  const createProduct = useSelector((state) => state.createProduct)
  const {
    loading: createProductLoading,
    product: createdProduct,
    success: createProductSuccess,
    error: createProductError,
  } = createProduct

  useEffect(() => {
    dispatch({ type: 'PRODUCTCREATE_RESET' })

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
      if (createProductSuccess) {
        navigate(`/product/edit/${createdProduct._id}`)
      } else if (!products || products.length === 0 || deleteProductSuccess) {
        dispatch(listOfProducts())
      }
      if (!orders || orders.length === 0 || deleteOrderSuccess) {
        dispatch(orderListAction())
      }
    } else {
      navigate('/login')
    }
  }, [
    dispatch,
    navigate,
    user,
    deleteOrderSuccess,
    updateUserSuccess,
    deleteUserSuccess,
    deleteProductSuccess,
    createProductSuccess,
    createdProduct,
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
          createProductLoading={createProductLoading}
          createProductError={createProductError}
        />
      </Row>

      <h3>Table of Orders</h3>
      <Row style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <AdminOrderList
          orders={orders}
          loading={orderLoading}
          error={orderError}
        />
      </Row>
    </div>
  )
}

export default AdminPage
