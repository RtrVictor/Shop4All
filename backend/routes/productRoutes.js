import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../blueprint/productBlueprint.js'
import { protect, isAdmin } from '../middleware/authentificationMiddleware.js'

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

//Description: Delete a single product
//Route: DELETE /api/products/:id
//Access: Private (need token)/Admin (needs admin)
router.route('/:id').delete(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const singleProduct = await Product.findById(req.params.id)

    if (singleProduct) {
      await singleProduct.deleteOne({ _id: req.params.id })
      res.json({ message: 'Product deleted successfully' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
