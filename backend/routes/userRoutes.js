import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../blueprint/userBlueprint.js'
import jwt from 'jsonwebtoken'
import { protect, isAdmin } from '../middleware/authentificationMiddleware.js'

const router = express.Router()

const token = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_JWT, {
    expiresIn: '30d',
  })
}

//Description: Get all users
//Route: Get /api/users
//Access: Private (need token)/Admin (needs admin)
router.route('').get(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
  })
)

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

//Description: Update the users profile
//Route: PUT /api/users/profile
//Access: Private (need token)
router.route('/profile').put(
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error(`The user doesn't exist`)
    }
  })
)

//Description: Delete a single users
//Route: DELETE /api/users/:id
//Access: Private (need token)/Admin (needs admin)
router.route('/:id').delete(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const singleUser = await User.findById(req.params.id)
    if (singleUser) {
      await singleUser.deleteOne({ _id: req.params.id })
      res.json({ message: 'User deleted successfully' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

//Description: Get a user by id
//Route: Get /api/users/:id
//Access: Private (need token)/Admin (needs admin)
router.route('/:id').get(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const singleUser = await User.findById(req.params.id).select('-password')
    if (singleUser) {
      res.json(singleUser)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

//Description: Update the users profile as an admin
//Route: PUT /api/users/:id
//Access: Private (need token)/Admin(needs admin)
router.route('/:id').put(
  protect,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error(`The user doesn't exist`)
    }
  })
)

export default router
