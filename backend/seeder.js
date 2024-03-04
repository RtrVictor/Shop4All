//Script that adds/removes data from my db.

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './blueprint/userBlueprint.js'
import Product from './blueprint/productBlueprint.js'
import Order from './blueprint/orderBlueprint.js'

import connectDB from './configuration/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUser = await User.insertMany(users)
    const adminUser = createdUser[0]._id
    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      }
    })
    await Product.insertMany(sampleProducts)
    console.log('Data inserted.')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data deleted.')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
