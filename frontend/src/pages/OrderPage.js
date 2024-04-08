import { React, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrderAction } from '../actions/orderActions'

const OrderPage = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const detailsOrder = useSelector((state) => state.detailsOrder)
  const { loading, order, error } = detailsOrder

  useEffect(() => {
    dispatch(detailsOrderAction(id))
  }, [dispatch, id])

  if (!loading) {
    //Prices:
    order.TotalProductPrice = Number(
      order.orderProducts.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      )
    ).toFixed(2)
  }

  return (
    <div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h2>Order {order._id}</h2>
          <div>
            <strong>Name: </strong>
            {order.user.name}
          </div>
          <div>
            <strong>Email: </strong>
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </div>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                {order.orderProducts.map((product, idx) => (
                  <ListGroup.Item key={idx}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={product.image}
                          fluid
                          rounded
                          alt={product.name}
                        ></Image>
                      </Col>
                      <Col>
                        <Link
                          style={{ textDecoration: 'none', color: '#333' }}
                          to={`/product/${product.product}`}
                        >
                          {product.name}
                        </Link>
                      </Col>
                      <Col
                        md={4}
                      >{`${product.quantity} x $${product.price}`}</Col>
                      <Col md={2}>
                        ${Number(product.quantity * product.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <div className='separating-line'></div>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div>
                    <strong>Address:</strong> {order.deliveryAddress.address}
                  </div>
                  <div>
                    <strong>City:</strong> {order.deliveryAddress.city}
                  </div>
                  <div>
                    <strong>Country:</strong> {order.deliveryAddress.country}
                  </div>
                  <div>
                    <strong>Postal Code:</strong>{' '}
                    {order.deliveryAddress.postalCode}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>Selected payment method: {order.paymentMethod}</Col>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  Items: {`$${order.TotalProductPrice}`}
                </ListGroup.Item>
                <ListGroup.Item>
                  Delivery:
                  {order.shippingPrice === 0 ? (
                    <span style={{ color: 'green' }}> Free</span>
                  ) : (
                    ` $${order.shippingPrice}`
                  )}
                </ListGroup.Item>
                <ListGroup.Item>Tax: {`$${order.taxPrice}`}</ListGroup.Item>
                <ListGroup.Item>Total: {`$${order.totalPrice}`}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {order.isPaid ? (
                <div className='bg-success'>
                  The order was paid at {order.paidAt}
                </div>
              ) : (
                <div className='bg-danger'>The order was not paid yet</div>
              )}
            </Col>
            <Col>
              {order.isDelivered ? (
                <div className='bg-success'>
                  The order was delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className='bg-danger'>The order was not delivered yet</div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default OrderPage
