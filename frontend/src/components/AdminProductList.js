import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Spinner, Table, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  deleteProductAction,
  createProductAction,
} from '../actions/productActions'

const AdminProductList = ({
  loading,
  products,
  error,
  createProductLoading,
  createProductError,
}) => {
  const dispatch = useDispatch()

  const createProduct = () => {
    dispatch(createProductAction())
  }

  const deleteProduct = (id) => {
    if (
      window.confirm('Are you sure you want to permanently delete this item?')
    ) {
      dispatch(deleteProductAction(id))
    }
  }

  return (
    <div>
      <Button className='btn btn-success ' onClick={() => createProduct()}>
        <i className='fa-solid fa-square-plus' variant='success'></i> Create a
        product
      </Button>

      {error && <div className='alert-danger py-3 text-center'>{error}</div>}
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      {createProductError && (
        <div className='alert-danger py-3 text-center'>{error}</div>
      )}
      {createProductLoading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <Table striped hover bordered>
          <thead style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Image</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Management</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product._id}</td>
                  <td>
                    <Image src={product.image} style={{ maxHeight: '90px' }} />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
                  <td>
                    {product.rating}{' '}
                    <i className='fa-solid fa-star yellow-icon'></i>
                  </td>
                  <td>
                    <LinkContainer to={`/product/edit/${product._id}`}>
                      <Button className='btn btn-primary'>
                        <i className='fa-solid fa-pen-to-square'></i>
                      </Button>
                    </LinkContainer>
                    <span style={{ marginRight: '5px' }}></span>
                    <Button
                      className='btn btn-danger'
                      onClick={() => deleteProduct(product._id)}
                    >
                      <i className='fa-solid fa-trash '></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminProductList
