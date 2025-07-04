import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

//because you should only see users if you are logged in
router.get("/", protectRoute, getAllUsers);



export default router;