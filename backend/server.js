import dotenv from 'dotenv'
import express from 'express'
import connectDB from './configuration/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/customErrorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Api running fast')
})

app.use('/api/products', productRoutes)
//Custom error

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is up on port ${PORT}, in ${process.env.NODE_ENV}.`.blue.underline
  )
)
