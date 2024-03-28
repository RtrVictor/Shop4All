import React from 'react'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  addToShoppingCart,
  removeFromShoppingCart,
  decreaseQuantity,
} from '../actions/shoppingCartActions'

const ProductShoppingCart = ({ cartProduct }) => {
  const dispatch = useDispatch()

  const addProductQuantity = (e) => {
    if (cartProduct.quantity < cartProduct.countInStock) {
      dispatch(
        addToShoppingCart(cartProduct.product, Number(cartProduct.quantity + 1))
      )
    } else {
      alert('MaxValueReached')
    }
  }

  const removeProductQuantity = (e) => {
    if (cartProduct.quantity > 1) {
      // Ensure quantity doesn't go below 1
      dispatch(decreaseQuantity(cartProduct.product))
    } else {
      alert('Quantity already at minimum')
    }
  }

  const removeProduct = () => {
    dispatch(removeFromShoppingCart(cartProduct.product))
  }

  return (
    <div>
      <ListGroup key={cartProduct.product} className='py-2'>
        <ListGroup.Item className='shadow'>
          <Row>
            <Col xs={3}>
              <Image src={cartProduct.image} fluid rounded alt='Book' />
            </Col>
            <Col>
              <p>{cartProduct.name}</p>
            </Col>
            <Col>
              <Row>
                <p style={{ fontWeight: '500' }}>
                  Count in stock:{cartProduct.countInStock}
                </p>
              </Row>
              <Row>
                <p style={{ fontWeight: '500' }}>
                  Price for 1 product:
                  {cartProduct.price}$
                </p>
              </Row>
              <Row>
                <p style={{ fontWeight: '500' }}>
                  Price:
                  {(cartProduct.quantity * cartProduct.price).toFixed(2)}$
                </p>
              </Row>
              <Row>
                <Col className='d-flex flex-row align-items-center'>
                  <Button
                    className='px-2'
                    variant='link'
                    onClick={(e) => removeProductQuantity(e)}
                  >
                    <i className='fas fa-minus'></i>
                  </Button>
                  <Form.Control
                    min={0}
                    max={cartProduct.countInStock}
                    size='sm'
                    style={{ width: '40px' }}
                    className='rounded'
                    value={cartProduct.quantity}
                    readOnly
                  />
                  <Button
                    className='px-2'
                    variant='link'
                    onClick={(e) => addProductQuantity(e)}
                  >
                    <i className='fas fa-plus'></i>
                  </Button>
                </Col>
                <Col>
                  <Button onClick={removeProduct}>
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default ProductShoppingCart
