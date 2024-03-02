import React from 'react'

const Rating = (props) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color: props.color }}
          className={
            props.rating >= 1
              ? 'fa-solid fa-star'
              : props.rating >= 0.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            props.rating >= 2
              ? 'fa-solid fa-star'
              : props.rating >= 1.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            props.rating >= 3
              ? 'fa-solid fa-star'
              : props.rating >= 2.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            props.rating >= 4
              ? 'fa-solid fa-star'
              : props.rating >= 3.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: props.color }}
          className={
            props.rating >= 5
              ? 'fa-solid fa-star'
              : props.rating >= 4.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span>{props.value} reviews</span>
    </div>
  )
}

export default Rating
