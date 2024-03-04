import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      //useNewUrlParser: true options no longer needed,
      //useUnifiedTopology: true  options no longer needed,
    })
    console.log(
      `MongoDB connected successfully to: ${connect.connection.host}`.magenta
        .underline
    )
  } catch (error) {
    console.error(
      `Unable to connect to MongoDB: ${error.message}`.red.underline
    )
    process.exit(1)
  }
}

export default connectDB
