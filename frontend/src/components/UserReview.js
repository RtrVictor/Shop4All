import React from 'react'
import RatingStars from './RatingStars'
import { Row, Col } from 'react-bootstrap'

const UserReview = ({ reviews }) => {
  console.log(reviews)

  const getInitials = (name) => {
    const words = name.split(' ')
    let initials = ''
    words.forEach((word) => {
      if (word.length > 0) {
        initials += word[0].toUpperCase()
      }
    })
    return initials
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  return (
    <div>
      {reviews.map((review) => (
        <Row key={review._id}>
          <div className='separating-line'></div>
          <Col className='col-4'>
            <Col
              className='circle'
              style={{ backgroundColor: getRandomColor() }}
            >
              {getInitials(review.name)}
            </Col>
            <Col>
              <Row>{review.name}</Row>
              <Row>{review.updatedAt.slice(0, 10)}</Row>
            </Col>
          </Col>
          <Col className='col-8'>
            <Row>
              <RatingStars rating={review.rating} color='#F9BF3B' />
            </Row>
            <Row>{review.comment}</Row>
          </Col>
          <div className='separating-line'></div>
        </Row>
      ))}
    </div>
  )
}

export default UserReview
