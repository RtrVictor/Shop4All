import React, { useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listOfProducts } from '../actions/productActions'

const HomePage = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listOfProducts())
  }, [dispatch])

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
          <h1>Various Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  )
}

export default HomePage
