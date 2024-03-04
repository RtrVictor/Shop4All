import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../blueprint/productBlueprint.js'

const router = express.Router()

//Description: Fetch all products
//Route: Get /api/products
//Access: Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//Description: Fetch a single product
//Route: Get /api/products/:id
//Access: Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('Item not found')
    } else {
      res.json(product)
    }
  })
)
export default router
