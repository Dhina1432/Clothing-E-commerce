import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add item  to  cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.sizes.includes(size)) {
      return res.status(400).json({
        success: false,
        message: "Selected size not available",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        quantity,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.pull({ _id: itemId });
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items.pull({ _id: itemId });
    await cart.save();
    await cart.populate("items.product");

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
