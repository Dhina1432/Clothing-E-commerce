import React from "react";
import { useCart } from "../context/CartContext.jsx";

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    await updateCartItem(item._id, newQuantity);
  };

  const handleRemove = async () => {
    await removeFromCart(item._id);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      {/* Product Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h4 className="mb-2 font-semibold text-gray-800">
          {item.product.name}
        </h4>
        <p className="mb-2 text-sm text-gray-500">
          Size: <span className="font-medium">{item.size}</span>
        </p>
        <p className="font-bold text-gray-800">${item.product.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="px-3 py-1 text-lg font-semibold border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>

        <span className="min-w-[32px] text-center font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="px-3 py-1 text-lg font-semibold border rounded-md text-gray-700 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="min-w-[80px] text-center font-semibold text-gray-800">
        ${(item.product.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
