import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../actions/productActions'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productSingle = useSelector((state) => state.productSingle)
  const { loading, product, error } = productSingle

  useEffect(() => {
    dispatch(singleProduct(id))
  }, [id, dispatch])

  const goBack = () => {
    navigate(-1)
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
      )}
    </div>
  )
}

export default ProductPage
