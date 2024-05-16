import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = (props) => {
  return (
    <Card
      className='product-card rounded my-3 shadow'
      style={{ height: '430px' }}
    >
      <div
        style={{ minHeight: '250px', maxHeight: '300px', overflow: 'hidden' }}
      >
        <Link to={`product/${props.product._id}`}>
          <Card.Img
            variant='top'
            src={props.product.image}
            className='rounded-top'
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </Link>
      </div>

      <Card.Body>
        <Link href={`product/${props.product._id}`} className='card-title'>
          <Card.Title>{props.product.name}</Card.Title>
        </Link>
        <Rating
          rating={props.product.rating}
          value={`${props.product.numReviews}`}
          color='#F9BF3B'
        />
        <div className='my-3'>
          <Card.Text>${props.product.price}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
