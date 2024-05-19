import React from 'react'
import { Button, Row, Col, Form, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createReviewAction } from '../actions/productActions'

const ReviewForm = ({
  showForm,
  product,
  rating,
  comment,
  setRating,
  setComment,
}) => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const createReview = useSelector((state) => state.createReview)
  const { error: errorReview } = createReview

  const login = useSelector((state) => state.login)
  const { user } = login

  const submitReview = (e) => {
    e.preventDefault()
    dispatch(createReviewAction(id, { rating, comment }))
  }

  return (
    <div className='popup-container'>
      <div className='popup-content'>
        {user ? (
          <div>
            <Row style={{ fontWeight: 'bold' }}>Give a review to:</Row>
            {errorReview && <div>{errorReview} </div>}
            <Row>
              <Col className='col-2'>
                <Image
                  src={product.image}
                  style={{ width: '100%', height: '100%' }}
                />
              </Col>
              <Col className='col-2'>{product.name}</Col>
              <Col className='col-8'>{product.description}</Col>
            </Row>
            <Form onSubmit={submitReview}>
              <Form.Group className='mb-3' controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as='select'
                  value={rating}
                  placeholder='Select rating'
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1-Poor</option>
                  <option value='2'>2-Fair...</option>
                  <option value='3'>3-Average...</option>
                  <option value='4'>4-Very Good...</option>
                  <option value='5'>5-Excelent...</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicComment'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button type='submit'>Add Review</Button>
            </Form>
          </div>
        ) : (
          <div>
            Please log in to leave a review. <Link to='/login'>Log in</Link>
          </div>
        )}
        <Row>
          <Col className='text-end'>
            <Button
              style={{ right: '10px' }}
              variant='danger'
              onClick={showForm}
            >
              Close
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ReviewForm
