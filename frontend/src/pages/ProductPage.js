import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find((prod) => prod._id === id)

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <button onClick={goBack} className='btn btn-light my-3'>
        Go Back
      </button>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                rating={product.rating}
                value={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>
              <div>Description: </div>
              {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Avalability:</Col>
                  <Col>
                    {product.countInStock > 0
                      ? product.countInStock
                      : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    {
                      <Button
                        disabled={product.countInStock === 0}
                        className={`btn-block ${
                          product.countInStock === 0 ? 'btn-dark' : ''
                        }`}
                        type='button'
                      >
                        Add to shopping cart
                      </Button>
                    }
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage
