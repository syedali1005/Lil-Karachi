import express from "express";
import {
  addItemController,
  getItemController,
  editItemController,
  deleteItemController,
} from "../controllers/itemController.js";

const router = express.Router();

// Routes
// Method - GET
router.get("/get-item", getItemController);

// Method - POST
router.post("/add-item", addItemController);

// Method - PUT
router.put("/edit-item", editItemController);

// Method - DELETE
router.delete("/delete-item/:itemId", deleteItemController);

export default router;
