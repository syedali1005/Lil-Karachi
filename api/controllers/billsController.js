import Bills from "../models/billsModel.js";

// Add a new bill
export const addBillsController = async (req, res) => {
  try {
    const lastBill = await Bills.findOne().sort({ invoiceNumber: -1 });
    const newInvoiceNumber = lastBill?.invoiceNumber != null ? lastBill.invoiceNumber + 1 : 1;

    const newBill = new Bills({
      ...req.body,
      invoiceNumber: newInvoiceNumber,
    });

    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

// Get all bills data
export const getBillsController = async (req, res) => {
  try {
    // Fetch all bills from the database
    const bills = await Bills.find();
    
    // Send the bills as the response
    res.send(bills);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch bills");
  }
};
