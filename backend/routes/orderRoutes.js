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

//Description: Show orders on profile
//Route: GET /api/orders/userorders
//Access: Private
router.route('/userorders').get(
  protect,
  asyncHandler(async (req, res) => {
    const userOrders = await Order.find({ user: req.user._id })
    res.json(userOrders)
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

//Description: Change the order to paied
//Route: PUT /api/orders/:id/payment
//Access: Private
router.route('/:id/payment').put(
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      //From paypal:
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const paidOrder = await order.save()
      res.json(paidOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)

export default router
