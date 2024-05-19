import React from 'react'
import Rating from './Rating'
import UserReview from './UserReview'
import ReviewForm from './ReviewForm'
import { Row, Col, ProgressBar, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const Reviews = ({
  product,
  rating,
  comment,
  setRating,
  setComment,
  showForm,
  showReviewForm,
}) => {
  const location = useLocation()
  const currentPage = location.pathname.includes('product')
    ? 'productPage'
    : 'otherPage'
  // Calculate the percentage of each star rating
  const calculateRatingPercentages = () => {
    const totalReviews = product.numReviews
    const ratingsCount = [0, 0, 0, 0, 0]

    product.reviews.forEach((review) => {
      ratingsCount[review.rating - 1]++
    })

    const ratingPercentages = ratingsCount.map((count) =>
      totalReviews ? (count / totalReviews) * 100 : 0
    )

    return { ratingPercentages, ratingsCount }
  }

  const { ratingPercentages, ratingsCount } = calculateRatingPercentages()

  const roundedRating = (Math.round(product.rating * 100) / 100).toFixed(2)

  return (
    <div>
      <Row style={{ display: 'inline' }}>
        {showReviewForm ? (
          <ReviewForm
            showForm={showForm}
            product={product}
            rating={rating}
            comment={comment}
            setRating={setRating}
            setComment={setComment}
          />
        ) : (
          ''
        )}
        <h2 style={{ fontWeight: 'bold' }}>Reviews</h2>
        {product.numReviews === 0 ? (
          ' (No one reviewed this product :('
        ) : (
          <span
            style={{
              fontWeight: 'normal',
              lineHeight: '1',
              color: '#888888',
              display: 'inline',
            }}
          >
            {' '}
            ({product.numReviews}{' '}
            {product.numReviews === 1 ? 'review' : 'reviews'})
          </span>
        )}
      </Row>
      <Row>
        <Col className='rating d-flex flex-column align-items-center justify-content-center'>
          <Row
            style={{
              fontSize: '40px',
              lineHeight: '48px',
              marginBottom: '10px',
              fontWeight: '600',
              color: '#666',
            }}
          >
            {roundedRating}
          </Row>
          <Row>
            <Rating
              rating={product.rating}
              value={product.numReviews}
              color='#F9BF3B'
              page={currentPage}
            />
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <span>
                5 star ({ratingsCount[4]}){' '}
                <ProgressBar striped now={ratingPercentages[4]} />
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>
                4 star ({ratingsCount[3]}){' '}
                <ProgressBar striped now={ratingPercentages[3]} />
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>
                3 star ({ratingsCount[2]}){' '}
                <ProgressBar striped now={ratingPercentages[2]} />
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>
                2 star ({ratingsCount[1]}){' '}
                <ProgressBar striped now={ratingPercentages[1]} />
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>
                1 star ({ratingsCount[0]}){' '}
                <ProgressBar striped now={ratingPercentages[0]} />
              </span>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <h3>Owned or used this product ?</h3>
          </Row>
          <Row>
            <h6>Give us an opionion by leaving a review.</h6>
          </Row>
          <Row>
            <span>
              <Button
                className='btn btn-block'
                style={{ width: '30%' }}
                onClick={showForm}
              >
                Add a review
              </Button>
            </span>
          </Row>
        </Col>
      </Row>
      <Row>
        <UserReview reviews={product.reviews} />
      </Row>
    </div>
  )
}

export default Reviews
