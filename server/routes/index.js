import express from "express";
import userRoutes from "./userRoutes.js"

const router = express.Router();

//Users Routes
router.use("/user",userRoutes)


export default router;
