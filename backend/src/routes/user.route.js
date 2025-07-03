import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.auth.userId
  res.json({ message: "User route is working!" });
});



export default router;