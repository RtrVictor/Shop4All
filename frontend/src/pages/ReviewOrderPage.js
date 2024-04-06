import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../components/ProgressBar'

const ReviewOrderPage = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart)
  const { shoppingCartProducts, deliveryAddress, paymentMethod } = shoppingCart

  const login = useSelector((state) => state.login)
  const { user } = login

  //Prices:
  shoppingCartProducts.TotalProductPrice = shoppingCartProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  )
  shoppingCartProducts.ShippingPrice =
    shoppingCartProducts.TotalProductPrice < 100 ? 20 : 0

  shoppingCartProducts.TaxPrice = Number(
    0.1 * shoppingCartProducts.TotalProductPrice
  ).toFixed(2)

  shoppingCartProducts.TotalPrice = Number(
    Number(shoppingCartProducts.TotalProductPrice) +
      Number(shoppingCartProducts.ShippingPrice) +
      Number(shoppingCartProducts.TaxPrice)
  ).toFixed(2)

  const placeOrder = () => {
    console.log('Merge')
  }
  return (
    <div>
      <ProgressBar s1 s2 s3 s4 />
      <Row>
        <Col>
          <ListGroup variant='flush'>
            {shoppingCartProducts.map((product, id) => (
              <ListGroup.Item key={id}>
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
                  <Col md={4}>{`${product.quantity} x $${product.price}`}</Col>
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
                <strong>Address:</strong> {deliveryAddress.address}
              </div>
              <div>
                <strong>City:</strong> {deliveryAddress.city}
              </div>
              <div>
                <strong>Country:</strong> {deliveryAddress.country}
              </div>
              <div>
                <strong>Postal Code:</strong> {deliveryAddress.postalCode}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>Selected payment method: {paymentMethod}</Col>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              Items: {`$${shoppingCartProducts.TotalProductPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>
              Delivery:
              {shoppingCartProducts.ShippingPrice === 0 ? (
                <span style={{ color: 'green' }}> Free</span>
              ) : (
                ` $${shoppingCartProducts.ShippingPrice}`
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: {`$${shoppingCartProducts.TaxPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>
              Total: {`$${shoppingCartProducts.TotalPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn-block'
                disabled={shoppingCart.shoppingCartProducts === 0}
                onClick={placeOrder}
              >
                {' '}
                Place your order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ReviewOrderPage
