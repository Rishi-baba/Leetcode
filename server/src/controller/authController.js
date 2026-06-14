import User from "../model/user.js"
import validate from "../utils/validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import client from '../config/redis.js'
import submission from "../model/submission.js"

export const register = async(req,res)=>{

  try {

    validate(req.body)
    
    const { firstName, emailId, lastName, age, password  } = req.body

    
    req.body.password = await bcrypt.hash(password, 10 )
    
    const user = await User.create(req.body)
    
    const token =  jwt.sign({userId:user._id,role:user.role, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    const result = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id
    }
    res.status(201).send("user created successfully",result)


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

    const token = jwt.sign({userId:user._id, role:user.role, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

      const result = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id
      }

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    res.status(201).send("Login sucksexfull", result)

  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong");
  }

}


export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    console.log(token);
    

    if (!token) {
      return res.status(400).send("Token not found");
    }

    const payload = jwt.decode(token);

    console.log("payload:", payload);
    console.log("exp:", payload?.exp);

    await client.set(`token:${token}`, "blocked");
    await client.expireAt(`token:${token}`, payload.exp);

    res.clearCookie("token");

    res.send("Logout successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const adminRegister = async (req,res)=>{
    try {

    validate(req.body)
    
    const { firstName, emailId, lastName, age, password  } = req.body

    console.log(req.body);
    console.log(emailId);
    req.body.password = await bcrypt.hash(password, 10 )
    // req.body.role="admin"
    
    const user = await User.create(req.body)
    
    const token =  jwt.sign({userId:user._id,role:user.role, email:emailId},process.env.JWT_TOKEN,{expiresIn:60*60})

    res.cookie('token',token, {maxAge: 60 * 60 * 1000})
    res.status(201).send("user created successfully")


  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong");
  }
}

export const deleteProfil = async (req,res)=>{
  const userId = res.result._id

  await User.findByIdAndDelete(userId)

  await submission.deleteMany({userId})

  res.status(200).send("Deleted successfully")


}
