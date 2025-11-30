import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, enum: ["Men", "Women", "Kids"], required: true },
    sizes: [{ type: String, enum: ["S", "M", "L", "XL"] }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
