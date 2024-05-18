import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listOfProducts } from '../actions/productActions'
import MainPageCarousel from '../components/MainPageCarousel'
import MainPagePagination from '../components/MainPagePagination'

const HomePage = ({ filteredProducts }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error } = productList

  useEffect(() => {
    dispatch(listOfProducts())
  }, [dispatch])

  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <MainPageCarousel />
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
              {currentProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <MainPagePagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
