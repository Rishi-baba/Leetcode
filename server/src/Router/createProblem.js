import { Router } from "express";
import { checkAdmin } from "../middleware/checkadmin.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { createProblem, deleteProblem, getAllProblem, getProblemById, problemUpdate } from "../controller/userProblem.js";

const problemRouter = Router()


problemRouter.post("/create",checkAdmin, createProblem);

problemRouter.put("/update/:id",checkAdmin, problemUpdate);

problemRouter.delete("/delete/:id",checkAdmin, deleteProblem);

// problemRouter.get("/user",userMiddleware, solvedProblem);

problemRouter.get("/getAllProblem",userMiddleware, getAllProblem);

problemRouter.get("/problemById/:id",userMiddleware, getProblemById);

problemRouter.get("/submittedProblem:pid", userMiddleware, getsubmittedProblem)

export default problemRouter

