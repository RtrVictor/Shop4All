import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ShoppingCartPriceCard = ({ shoppingCartProducts }) => {
  const navigate = useNavigate()

  const onContinue = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div>
      <Card className='shadow'>
        <div>
          <p>Order summary:</p>
          <p>
            TOTAL OF ITEMS:{' '}
            {shoppingCartProducts.reduce(
              (acc, cartProduct) => acc + cartProduct.quantity,
              0
            )}{' '}
            Products
          </p>
          <p>
            Total:
            {shoppingCartProducts
              .reduce(
                (acc, cartProduct) =>
                  acc + cartProduct.quantity * cartProduct.price,
                0
              )
              .toFixed(2)}
          </p>
          <p>
            Delivery Cost:{' '}
            {shoppingCartProducts
              .reduce(
                (acc, cartProduct) =>
                  acc + cartProduct.quantity * cartProduct.price,
                0
              )
              .toFixed(2) < 100 ? (
              '20$'
            ) : (
              <span style={{ color: 'green' }}>Free</span>
            )}
          </p>
          <Button onClick={onContinue}>Continua</Button>
        </div>
      </Card>
    </div>
  )
}

export default ShoppingCartPriceCard
