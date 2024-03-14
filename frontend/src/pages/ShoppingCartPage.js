import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToShoppingCart } from '../actions/shoppingCartActions'
import ProductShoppingCart from '../components/ProductShoppingCart'

const ShoppingCartPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const shoppingCart = useSelector((state) => state.shoppingCart)
  const { shoppingCartProducts } = shoppingCart

  useEffect(() => {
    if (id) {
      dispatch(addToShoppingCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const onContinue = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <div style={{ fontWeight: 'bold', fontSize: '25px' }}>
        My Shopping Cart
      </div>
      <Col xs={8}>
        {shoppingCartProducts.map((cartProduct) => (
          <ProductShoppingCart
            key={cartProduct.product}
            cartProduct={cartProduct}
          />
        ))}
      </Col>
      <Col xs={4} className='py-2'>
        <Card className='shadow'>
          <div>
            <p>
              TOTAL OF ITEMS:
              {shoppingCartProducts.reduce(
                (acc, cartProduct) => acc + cartProduct.quantity,
                0
              )}
            </p>
            <p>
              Suma totala:
              {shoppingCartProducts
                .reduce(
                  (acc, cartProduct) =>
                    acc + cartProduct.quantity * cartProduct.price,
                  0
                )
                .toFixed(2)}
            </p>
            <p>Cost Livrare</p>
            <Button onClick={onContinue}>Continua</Button>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default ShoppingCartPage
