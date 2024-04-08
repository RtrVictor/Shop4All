import express from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../blueprint/orderBlueprint.js'
import { protect } from '../middleware/authentificationMiddleware.js'

const router = express.Router()

//Description: Create a new order
//Route: POST /api/orders
//Access: Private
router.route('/').post(
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderProducts,
      deliveryAddress,
      paymentMethod,
      productsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderProducts && orderProducts.length === 0) {
      res.status(400)
      throw new Error('No order products existing')
    } else {
      const order = new Order({
        orderProducts,
        deliveryAddress,
        paymentMethod,
        productsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
      })

      const existingOrder = await order.save()
      res.status(201).json(existingOrder)
    }
  })
)

//Description: Get order details by id
//Route: Get /api/orders/:id
//Access: Private
router.route('/:id').get(
  protect,
  asyncHandler(async (req, res) => {
    //Want order and also the name and email of the user
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)

export default router
