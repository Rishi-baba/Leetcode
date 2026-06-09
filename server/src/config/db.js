import mongoose from "mongoose"

const connectdb = async()=>{
  try {
    
  await mongoose.connect(process.env.DB_CONNECT_MONGO);

  } catch (error) {
    console.log(error)
  }
}
export default connectdb