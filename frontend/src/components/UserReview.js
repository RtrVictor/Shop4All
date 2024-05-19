import React from 'react'
import RatingStars from './RatingStars'
import { Row, Col } from 'react-bootstrap'

const UserReview = ({ reviews }) => {
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

  const getRandomColor = (name) => {
    // Generate a numeric hash based on the user's name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    // Convert the hash to a hex color
    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += ('00' + value.toString(16)).substr(-2)
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
              style={{ backgroundColor: getRandomColor(review.name) }}
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
