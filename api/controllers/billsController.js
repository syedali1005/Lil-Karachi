import Bills from "../models/billsModel.js";

// Add a new bill
export const addBillsController = async (req, res) => {
  try {
    const newBill = new Bills(req.body);
    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("Something went wrong");
    console.log(error);
  }
};

// Get all bills data
export const getBillsController = async (req, res) => {
  try {
    const bills = await Bills.find(); // Use 'Bills' instead of 'billsModel'
    res.send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch bills");
  }
};
