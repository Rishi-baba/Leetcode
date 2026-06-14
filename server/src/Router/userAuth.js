// import express from "express"
import { Router } from "express"
import { adminRegister, deleteProfil, login, logout, register } from "../controller/authController.js"
import { userMiddleware } from "../middleware/userMiddleware.js"
import { checkAdmin } from "../middleware/checkadmin.js"

const authRouter = Router()

// Register
authRouter.post('/register', register )
authRouter.post('/login', login )
authRouter.post('/admin/register', checkAdmin, adminRegister  )
authRouter.post('/logout', userMiddleware, logout )
authRouter.delete('/profil', userMiddleware, deleteProfil )
authRouter.get('/check', userMiddleware, ((req,res)=>{
    const result = {
      firstName: res.result.firstName,
      emailId: res.result.emailId,
      _id: res.result._id
    }
    res.status(200).json({
      user:result,
      message:"valid User"
    })
}))

// authRouter.post('/profile', getProfile )

export default authRouter