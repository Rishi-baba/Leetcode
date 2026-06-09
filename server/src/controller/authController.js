import User from "../model/user.js"
import validate from "../utils/validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{

  try {

    validate(req.body)
    
    const { firstName, emailId, lastName, age, password  } = req.body

    
    req.body.password = await bcrypt.hash(password, 10 )
    
    const user = await User.create(req.body)
    
    const token =  jwt.sign({userId:user._id, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    res.status(201).send("user created successfully")


  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong");
  }

}

export const login = async(req,res)=>{

  try {
    
    const {emailId, password} = req.body
    const user = await User.findOne({emailId})

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw new Error("invalid cred")
    }

    const token = jwt.sign({userId:user._id, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    res.status(201).send("Login sucksexfull")

  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong");
  }

}


export const logout = async(req,res)=>{

  try {
    
    

  } catch (error) {
    
  }

} 