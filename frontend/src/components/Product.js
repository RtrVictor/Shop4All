import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = (props) => {
  return (
    <div>
      <Card className='rounded my-3 p-3'>
        <Link className='card-title' to={`product/${props.product._id}`}>
          <Card.Img variant='top' rounded src={props.product.image} />
        </Link>
        <Card.Body>
          <Link className='card-title' href={`product/${props.product._id}`}>
            <Card.Title>{props.product.name}</Card.Title>
          </Link>
          <Card.Text>
            <div className='my-3'>
              <Rating
                rating={props.product.rating}
                value={`${props.product.numReviews}`}
                color='#F9BF3B'
              />
            </div>
          </Card.Text>
          <Card.Text>${props.product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product
