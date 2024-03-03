import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Various Products</h1>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <div>
            Loading...<i className='fa-solid fa-rotate-right'></i>
          </div>
        )}
      </Row>
    </div>
  )
}

export default HomePage
