import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import errorHandler from "./middleware/errorHandle.js";

dotenv.config();

//app config
const app = express();
const port = process.env.PORT || 5000;

connectDB();

//middleware
app.use(express.json());

// CORS configuration - simplified for production
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://clothing-e-commerce-ochre.vercel.app",
    ],
    credentials: false,
  })
);
// Apply CORS middleware

//api endpoints

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
