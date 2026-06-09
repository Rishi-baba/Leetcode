import User from "../model/user.js"
import validate from "../utils/validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const register = async(req,res)=>{

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

const login = async(req,res)=>{

  try {
    
    const {emailId, password} = req.body
    const user = User.findOne({emailId})

    const isMatch = bcrypt.compare(user.password, password)
    if(!ismMatch){
      throw new Error("invalid cred")
    }

    const token = jwt.sign({userId:user._id, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    res.status(201).send("user created successfully")

  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong");
  }

}
