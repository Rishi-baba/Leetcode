import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { submitCode } from "../controller/submitController.js";

const submitRouter = Router()

submitRouter.post('/submitAns/:id', userMiddleware, submitCode)



export default submitRouter