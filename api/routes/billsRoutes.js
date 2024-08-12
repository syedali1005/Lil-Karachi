import express from "express";
import { addBillsController, getBillsController,
} from "../controllers/billsController.js";

const router = express.Router();

//routes

//MEthod - POST
router.post("/add-bills", addBillsController);

//MEthod - GET
router.get("/get-bills", getBillsController);

export default router;
