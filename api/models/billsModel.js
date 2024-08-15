import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
    cashierName: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    orderType: {
      type: String,
      required: true,
      enum: ['take away', 'dine in', 'self-delivery', 'foodpanda'],
    },
  },
  { timestamps: true }
);

const Bills = mongoose.model("Bills", billSchema);

export default Bills;
