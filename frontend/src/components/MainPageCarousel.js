import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const MainPageCarousel = () => {
  return (
    <div className='carousel-container'>
      {' '}
      <Carousel variant='dark'>
        <Carousel.Item interval={5000} className='carousel-item'>
          <Image
            className='carousel-image'
            src='https://img.freepik.com/premium-vector/online-shopping-with-mobile-store-design-discount-promotion-banner_62391-413.jpg'
          />
        </Carousel.Item>
        <Carousel.Item interval={5000} className='carousel-item'>
          <Image
            className='carousel-image'
            src='https://img.freepik.com/free-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1711584000&semt=ais'
          />
        </Carousel.Item>
        <Carousel.Item interval={5000} className='carousel-item'>
          <Image
            className='carousel-image'
            src='https://static.vecteezy.com/system/resources/previews/004/987/839/non_2x/sale-discount-background-for-the-online-store-online-shopping-concept-illustration-of-online-shopping-concept-free-vector.jpg'
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default MainPageCarousel
