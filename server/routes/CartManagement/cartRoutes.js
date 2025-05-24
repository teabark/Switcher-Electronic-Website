import express from "express";
import cartController from "../../controllers/cartController.js"
const router = express.Router();

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCartByUser);
router.delete("/:cartItemId", cartController.deleteFromCart);

export default router;
