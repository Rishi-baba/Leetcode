import { Router } from "express";
import { checkAdmin } from "../middleware/checkadmin.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { createProblem } from "../controller/userProblem.js";

const problemRouter = Router()


problemRouter.post("/create",checkAdmin, createProblem);

// problemRouter.patch("/:id",checkAdmin, problemUpdate);

// problemRouter.delete("/:id",checkAdmin, problemDelete);

// problemRouter.get("/user",userMiddleware, solvedProblem);

// problemRouter.get("/",userMiddleware, getAllProblem);

// problemRouter.get("/:id",userMiddleware, getProblemById);

export default problemRouter

