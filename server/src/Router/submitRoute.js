import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { runcode, solvedProblems, submitCode } from "../controller/submitController.js";

const submitRouter = Router()

submitRouter.post('/submitAns/:id', userMiddleware, submitCode)
submitRouter.get('/problemSolved', userMiddleware, solvedProblems)
submitCode.post("/run/:id", userMiddleware,runcode)



export default submitRouter