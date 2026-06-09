import User from "../model/user.js"
import validate from "../utils/validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const register = async(req,res)=>{

  try {

    validate(req.body)
    
    const { firstName, emailId, lastName, age, password  } = req.body

    const user = {
      firstName,
      lastName,
      email,
      age,
    }

    bcrypt.hash(password, 10 )




  } catch (error) {
    console.log(error)
  }

}
