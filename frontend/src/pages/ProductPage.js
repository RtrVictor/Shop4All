import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import axios from 'axios'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    }
    fetchProduct()
  }, [id])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      {product ? (
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
                  <ListGroupItem>
                    <Row>
                      <Col className='d-flex justify-content-center'>
                        {
                          <Button
                            disabled={product.countInStock === 0}
                            className={`btn-block btn-info${
                              product.countInStock === 0 ? 'btn-dark' : ''
                            }`}
                            type='button'
                          >
                            <span>Add to favorite</span>{' '}
                            <i className='fa-solid fa-heart'></i>
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
      ) : (
        <div>
          Loading...<i className='fa-solid fa-rotate-right'></i>
        </div>
      )}
    </div>
  )
}

export default ProductPage
