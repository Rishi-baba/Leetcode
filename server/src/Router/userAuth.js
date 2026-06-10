// import express from "express"
import { Router } from "express"
import { adminRegister, login, logout, register } from "../controller/authController.js"
import { userMiddleware } from "../middleware/userMiddleware.js"
import { checkAdmin } from "../middleware/checkadmin.js"

const authRouter = Router()

// Register
authRouter.post('/register', register )
authRouter.post('/login', login )
authRouter.post('/admin/register', checkAdmin, adminRegister  )
authRouter.post('/logout', userMiddleware, logout )

// authRouter.post('/profile', getProfile )

export default authRouter