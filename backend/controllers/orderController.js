import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

//Create new order
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate total price and prepare order items
    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity;
      totalPrice += itemTotal;

      return {
        product: item.product._id,
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      status: "confirmed",
    });

    // Clear user's cart
    cart.items = [];
    await cart.save();

    // Send confirmation email
    try {
      await sendOrderEmail(order, req.user);
    } catch (emailError) {
      console.log("Email sending failed:", emailError);
      // Don't fail the order if email fails
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get user's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      orderDate: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
