import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
