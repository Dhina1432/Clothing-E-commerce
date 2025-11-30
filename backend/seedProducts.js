import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    description:
      "Comfortable and versatile white cotton t-shirt for everyday wear.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Denim Jacket",
    description: "Stylish denim jacket perfect for casual outings.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Slim Fit Jeans",
    description: "Comfortable slim fit jeans with stretch for all-day comfort.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress with floral pattern.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Women's Hoodie",
    description: "Cozy and warm hoodie for casual comfort.",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1485231183945-fffde7cb34e0?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Kids T-Shirt Pack",
    description: "Pack of 3 colorful t-shirts for active kids.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1503454532975-2c9bdc9f053f?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 60,
  },
  {
    name: "Men's Polo Shirt",
    description: "Classic polo shirt for smart casual occasions.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Women's Blouse",
    description: "Elegant blouse for office or special occasions.",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 28,
  },
  {
    name: "Kids Jacket",
    description: "Warm and waterproof jacket for kids.",
    price: 55.99,
    image: "https://images.unsplash.com/photo-1558769132-cb25c5d1c7c1?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 20,
  },
  {
    name: "Men's Shorts",
    description: "Comfortable cotton shorts for summer activities.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 55,
  },
  {
    name: "Women's Skirt",
    description: "Flowy skirt perfect for warm weather.",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 32,
  },
  {
    name: "Kids Shorts",
    description: "Durable and comfortable shorts for active kids.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1505022610480-60ce7dc8993e?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 48,
  },
  {
    name: "Men's Sweater",
    description: "Warm wool sweater for cold weather.",
    price: 65.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 22,
  },
  {
    name: "Women's Cardigan",
    description: "Soft cardigan perfect for layering.",
    price: 48.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 26,
  },
  {
    name: "Kids Sweater",
    description: "Cozy sweater to keep kids warm.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 38,
  },
  {
    name: "Men's Formal Shirt",
    description: "Crisp formal shirt for business occasions.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 33,
  },
  {
    name: "Women's Leggings",
    description: "Stretchy and comfortable leggings for everyday wear.",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 42,
  },
  {
    name: "Kids Dress",
    description: "Adorable dress for special occasions.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 29,
  },
  {
    name: "Men's Sports T-Shirt",
    description: "Moisture-wicking t-shirt for sports activities.",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 47,
  },
  {
    name: "Women's Sports Bra",
    description: "Supportive sports bra for active lifestyle.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1588744496751-efc206a03eV?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 36,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
