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
  Spinner,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../actions/productActions'
import Reviews from '../components/Reviews'

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productSingle = useSelector((state) => state.productSingle)
  const { loading, product, error } = productSingle

  const createReview = useSelector((state) => state.createReview)
  const { success: successReview } = createReview

  const showForm = () => {
    setShowReviewForm(!showReviewForm)
  }

  useEffect(() => {
    if (successReview) {
      alert('Review added')
      setRating(0)
      setComment('')
      dispatch({ type: 'CREATEREVIEW_RESET' })
      setShowReviewForm(false)
    }
    dispatch(singleProduct(id))
  }, [id, dispatch, successReview])

  const goBack = () => {
    navigate(-1)
  }

  const addToShop = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
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
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ width: '100%' }}
              />
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
                  {product.countInStock > 0 ? (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity selected:</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ) : null}
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
                            onClick={addToShop}
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
          <Row>
            <Reviews
              showReviewForm={showReviewForm}
              showForm={showForm}
              product={product}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
            />
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductPage
