import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToShoppingCart } from '../actions/shoppingCartActions'
import ProductShoppingCart from '../components/ProductShoppingCart'
import ShoppingCartPriceCard from '../components/ShoppingCartPriceCard'

const ShoppingCartPage = () => {
  const { id } = useParams()

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

  return (
    <Row>
      <div style={{ fontWeight: 'bold', fontSize: '25px' }}>
        My Shopping Cart
      </div>
      {shoppingCartProducts.length > 0 ? (
        <Row>
          <Col xs={8}>
            {shoppingCartProducts.map((cartProduct) => (
              <ProductShoppingCart
                id={id}
                key={cartProduct.product}
                cartProduct={cartProduct}
              />
            ))}
          </Col>
          <Col xs={4} className='py-2'>
            <ShoppingCartPriceCard
              shoppingCartProducts={shoppingCartProducts}
            />
          </Col>
        </Row>
      ) : (
        'No Items added'
      )}
    </Row>
  )
}

export default ShoppingCartPage
