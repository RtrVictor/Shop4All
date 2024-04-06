import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addDeliveryAddress } from '../actions/shoppingCartActions'
import ProgressBar from '../components/ProgressBar'

const DeliveryPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shoppingCart = useSelector((state) => state.shoppingCart)
  const { deliveryAddress } = shoppingCart

  const [address, setAddress] = useState(
    deliveryAddress ? deliveryAddress.address : ''
  )
  const [city, setCity] = useState(deliveryAddress ? deliveryAddress.city : '')
  const [country, setCountry] = useState(
    deliveryAddress ? deliveryAddress.country : ''
  )
  const [postalCode, setPostalCode] = useState(
    deliveryAddress ? deliveryAddress.postalCode : ''
  )

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addDeliveryAddress({ address, city, country, postalCode }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <ProgressBar s1 s2 />
      <h2>Shipping Address</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='success'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default DeliveryPage
