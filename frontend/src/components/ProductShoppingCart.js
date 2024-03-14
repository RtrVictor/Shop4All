import React from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToShoppingCart } from '../actions/shoppingCartActions'

const ProductShoppingCart = ({ cartProduct }) => {
  const dispatch = useDispatch()

  const addProductQuantity = (e) => {
    if (cartProduct.quantity < cartProduct.countInStock) {
      dispatch(
        addToShoppingCart(cartProduct.product, Number(cartProduct.quantity + 1))
      )
    } else {
      console.log('MaxValueReached')
    }
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
                <div className='d-flex flex-row align-items-center'>
                  <Button className='px-2' variant='link'>
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
                </div>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default ProductShoppingCart
