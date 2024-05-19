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

//Description: Create a single product
//Route: POST /api/products
//Access: Private (need token)/Admin (needs admin)
router.route('/').post(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const createdProduct = new Product({
      name: 'User Name',
      price: 0,
      user: req.user._id,
      image: '/images/image.jpg',
      category: 'Product category',
      brand: 'Product brand',
      description: 'Product description',
      countInStock: 0,
      numReviews: 0,
    })
    const newlyCreatedProduct = await createdProduct.save()
    res.status(201).json(newlyCreatedProduct)
  })
)

//Description: Update a single product
//Route: Put /api/products
//Access: Private (need token)/Admin (needs admin)
router.route('/:id').put(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { name, price, image, category, brand, description, countInStock } =
      req.body

    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = name
      product.price = price
      product.image = image
      product.category = category
      product.brand = brand
      product.description = description
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

//Description: Create a new review
//Route: Put /api/products/reviews/:id
//Access: Private (need token)
router.route('/reviews/:id').post(
  protect,
  asyncHandler(async (req, res) => {
    const { comment, rating } = req.body

    const product = await Product.findById(req.params.id) //Find product with url
    if (product) {
      const reviewedProduct = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )

      if (reviewedProduct) {
        res.status(400)
        throw new Error('Product already reviewed by user')
      }

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length

      const successfullyReviewedProduct = await product.save()
      res.status(201).json(successfullyReviewedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)
export default router
