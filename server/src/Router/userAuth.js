import express from "express"
import { Router } from "express"

const authRouter = Router

// Register
authRouter.post('/register', resiter )
authRouter.post('/login', login )
authRouter.post('/logout', logout )
authRouter.post('/profile', getProfile )