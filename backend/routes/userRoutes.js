import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../blueprint/userBlueprint.js'
import jwt from 'jsonwebtoken'
import { protect } from '../middleware/authentificationMiddleware.js'

const router = express.Router()

const token = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_JWT, {
    expiresIn: '30d',
  })
}

//Description: Authentificate user and get token
//Route: Post /api/users/login
//Access: Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Wrong email or password')
    }
  })
)

//Description: Get the users profile
//Route: Get /api/users/profile
//Access: Private (need token)
router.route('/profile').get(
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error(`The user doesn't exist`)
    }
  })
)

//Description: Register a new user
//Route: Post /api/users
//Access: Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userRegistered = await User.findOne({ email })

    if (userRegistered) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user')
    }
  })
)

export default router
