import jwt from "jsonwebtoken"
import User from "../model/user.js";
import client from "../config/redis.js";

export const userMiddleware = async(req,res,next)=>{
  console.log("user");


  const { token } = req.cookies;

  if(!token){
    throw new Error("token not present")
  }
  const payload =  jwt.verify(token, process.env.JWT_TOKEN)

  const { userId } = payload;

  if(!userId){
    throw new Error("token not present")
  }

  const result = await User.findById(userId);

  if(!result){
    throw new Error("token not present")
  }

  const isBlocked = await client.exists(`token:${token}`)

  if(isBlocked){
    throw new Error("Invalid token");
  }
  res.result = result
  next()

}