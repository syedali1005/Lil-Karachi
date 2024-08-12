import express from "express";

import {
  loginController,
  registerController,
} from "../controllers/userController.js";

const router = express.Router();

//routes
//Method - get
router.post("/login", loginController);

//MEthod - POST
router.post("/register", registerController);

export default router;
