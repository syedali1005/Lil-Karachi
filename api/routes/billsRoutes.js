import express from "express";
import {
  addBillsController,
  getBillsController,
  getSoldItemsSummaryController,
} from "../controllers/billsController.js";

const router = express.Router();

// Existing routes...
router.post("/add-bills", addBillsController);
router.get("/get-bills", getBillsController);

// New route to get sold items summary
router.get("/get-sold-items-summary", getSoldItemsSummaryController);

export default router;
