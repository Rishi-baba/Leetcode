import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  firstName:{
    type:String,
    required:true,
    minLength:3,
    maxLength:20
  },
  lastName:{
    type:String,
    // required:true,
    min:3,
    max:80
  },
  age:{
    type:Number,
  },
  emailId:{
    type:String,
    required:true,
    minLength:3,
    maxLength:20,
    unique:"true",
    trim:"true",
    immutable:"true",
    lowercase:"true"
  },
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},
  password:{
    type:String,
    required:true,
  },
  problemSolved:{
    type:String
  }
},{
  timestamps:true
})

const User = mongoose.model('user',userSchema)

export default User