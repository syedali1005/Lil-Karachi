import Bills from "../models/billsModel.js";

// Add a new bill
export const addBillsController = async (req, res) => {
  try {
    const lastBill = await Bills.findOne().sort({ invoiceNumber: -1 });
    const newInvoiceNumber = lastBill?.invoiceNumber != null ? lastBill.invoiceNumber + 1 : 1;

    const { discount = 0 } = req.body; // Get discount from request body, default to 0
    const subTotal = req.body.subTotal;
    const tax = Number(((subTotal / 100) * 10).toFixed(2));
    const totalAfterDiscount = subTotal - (subTotal * (discount / 100)); // Apply discount
    const totalAmount = Number((totalAfterDiscount + tax).toFixed(2)); // Calculate final total amount with tax

    const newBill = new Bills({
      ...req.body,
      invoiceNumber: newInvoiceNumber,
      subTotal,
      tax,
      discount,
      totalAmount,
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

export const getSoldItemsSummaryController = async (req, res) => {
  try {
    // Aggregate sold items data
    const bills = await Bills.find(); // Get all bills

    const itemsSummary = {};

    // Loop through all bills to aggregate data
    bills.forEach((bill) => {
      bill.cartItems.forEach((item) => {
        if (!itemsSummary[item.name]) {
          itemsSummary[item.name] = {
            itemName: item.name,
            quantitySold: 0,
            moneyGenerated: 0,
          };
        }
        itemsSummary[item.name].quantitySold += item.quantity;
        itemsSummary[item.name].moneyGenerated += item.quantity * item.price;
      });
    });

    // Convert itemsSummary object to an array
    const itemsSummaryArray = Object.values(itemsSummary);

    res.status(200).json(itemsSummaryArray);
  } catch (error) {
    console.error("Failed to fetch sold items summary:", error);
    res.status(500).send("Something went wrong while fetching sold items summary.");
  }
};

