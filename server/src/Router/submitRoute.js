import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { solvedProblems, submitCode } from "../controller/submitController.js";

const submitRouter = Router()

submitRouter.post('/submitAns/:id', userMiddleware, submitCode)
submitRouter.post('/problemSolved', userMiddleware, solvedProblems)




export default submitRouter