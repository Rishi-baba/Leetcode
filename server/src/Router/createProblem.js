import { Router } from "express";
import { checkAdmin } from "../middleware/checkadmin";
import { userMiddleware } from "../middleware/userMiddleware";

const problemRouter = Router()


problemRouter.post("/create",checkAdmin, problemCreate);

problemRouter.patch("/:id",checkAdmin, problemUpdate);

problemRouter.delete("/:id",checkAdmin, problemDelete);

problemRouter.get("/user",userMiddleware, solvedProblem);

problemRouter.get("/",userMiddleware, getAllProblem);

problemRouter.get("/:id",userMiddleware, getProblemById);

export default problemRouter

