import mongoose from "mongoose";
import { Schema } from "mongoose";
import { deleteProfil } from "../controller/authController";

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
    type:[{
      type:Schema.Types.ObjectId,
      ref:'problem'
    }]
  }
},{
  timestamps:true
})

userSchema.post("findOneAndDelete", async function( userInfo ){
  if(userInfo){
    await mongoose.model('submission').deleteMany({userId: userInfo._id})
  }
})

const User = mongoose.model('user',userSchema)

export default User