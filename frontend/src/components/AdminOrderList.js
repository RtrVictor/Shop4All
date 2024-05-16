import React from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteOrderAction } from '../actions/orderActions'

const AdminOrderList = ({ loading, orders, error }) => {
  const dispatch = useDispatch()

  const deleteOrder = (id) => {
    if (
      window.confirm('Are you sure you want to permanently delete this user?')
    ) {
      dispatch(deleteOrderAction(id))
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
            <th>Order ID</th>
            <th>User ID</th>
            <th>Products</th>
            <th>Delivery Address</th>
            <th>Is Paid</th>
            <th>Is Delivered</th>
            <th>Management</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.user}</td>

                <td>
                  {order.orderProducts.map((product) => (
                    <li key={product._id}>
                      {product.name} x {product.quantity}
                    </li>
                  ))}
                </td>

                <td>
                  {order.deliveryAddress.country}, {order.deliveryAddress.city},{' '}
                  {order.deliveryAddress.address},{' '}
                  {order.deliveryAddress.postalCode}
                </td>

                <td>
                  {order.isPaid ? (
                    <span style={{ color: 'green' }}>Paid</span>
                  ) : (
                    <span style={{ color: 'red' }}>Not Paid Yet</span>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    <span style={{ color: 'green' }}>Delivered</span>
                  ) : (
                    <span style={{ color: 'red' }}>Not Delivered Yet</span>
                  )}
                </td>

                <td>
                  <span style={{ marginRight: '5px' }}></span>
                  <Button
                    className='btn btn-danger'
                    onClick={() => deleteOrder(order._id)}
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

export default AdminOrderList
