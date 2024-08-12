import express from "express";
import {
  addItemController,
  getItemController,
  editItemController,
  deleteItemController,
} from "../controllers/itemController.js";

const router = express.Router();

//routes
//Method - get
router.get("/get-item", getItemController);

//Method - post
router.post("/add-item", addItemController);

//method - PUT
router.put("/edit-item", editItemController);

//method - DELETE
router.post("/delete-item", deleteItemController);

export default router;
