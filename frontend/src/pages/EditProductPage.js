import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct, updateProductAction } from '../actions/productActions'
import FormContainer from '../components/FormContainer'

const EditProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [img, setImg] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')

  const productSingle = useSelector((state) => state.productSingle)
  const { loading, product, error } = productSingle

  const updateProduct = useSelector((state) => state.updateProduct)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = updateProduct

  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(singleProduct(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImg(product.image)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
      setBrand(product.brand)
    }

    if (updateSuccess) {
      dispatch({ type: 'PRODUCTUPDATE_RESET' })
      navigate('/admin/manager')
    }
  }, [dispatch, navigate, product, id, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProductAction({
        _id: id,
        name,
        price,
        image: img,
        category,
        countInStock,
        description,
        brand,
      })
    )
  }

  return (
    <div>
      <div>
        <Link to='/admin/manager' className='btn btn-light'>
          Go back
        </Link>
      </div>
      <FormContainer>
        <h1>Edit Product</h1>

        {updateLoading && (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
        {updateError && (
          <div className='alert-danger py-3 text-center'>{updateError}</div>
        )}

        {loading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : error ? (
          <div className='alert-danger py-3 text-center'>{error}</div>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Add the price of the product'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image (URL):</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add the imageURL of the product'
                value={img}
                onChange={(e) => setImg(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add the category of the product'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Count In stock:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Add the count in stock of the product'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add a description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Name of the brand:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Add brand name'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit'>Continue</Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default EditProductPage
