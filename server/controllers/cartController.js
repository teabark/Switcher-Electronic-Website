import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newCartItem = new Cart({ userId, productId });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart", details: err.message });
  }
};

const getCartByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", details: err.message });
  }
};

const deleteFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await Cart.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Item deleted from cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item", details: err.message });
  }
};

// ✅ Default export
export default {
  addToCart,
  getCartByUser,
  deleteFromCart,
};
