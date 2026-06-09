// import express from "express"
import { Router } from "express"
import { login, logout, register } from "../controller/authController.js"

const authRouter = Router()

// Register
authRouter.post('/register', register )
authRouter.post('/login', login )
authRouter.post('/logout', logout )
// authRouter.post('/profile', getProfile )

export default authRouter