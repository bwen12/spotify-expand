import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router();

//because you should only see users if you are logged in
router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);



export default router;