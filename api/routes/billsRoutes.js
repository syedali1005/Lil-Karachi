import express from "express";
import { addBillsController, getBillsController,
} from "../controllers/billsController.js";

const router = express.Router();

//routes

//Method - POST
router.post("/add-bills", addBillsController);

//Method - GET
router.get("/get-bills", getBillsController);

export default router;
