import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addPaymentMethod } from '../actions/shoppingCartActions'
import ProgressBar from '../components/ProgressBar'

const PaymentPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shoppingCart = useSelector((state) => state.shoppingCart)
  const { deliveryAddress } = shoppingCart

  if (!deliveryAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))
    navigate('/putOrder')
  }

  return (
    <FormContainer>
      <ProgressBar s1 s2 s3 />
      <h2>Choose Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method:</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              value='Paypal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/*To add another payment method just copy the 
            Form.Check from above and change atributes */}
          </Col>
        </Form.Group>
        <Button type='submit' variant='success'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
