import express from "express";
import CartManager from "../dao/db/cart-manager-db.js";
import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import { calculateTotal } from "../utils/util.js";

//PREGUNTA PARA SAMU O ALLAN: Podría aquí usarse el CartModel en vez del CartManager?

const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error creating a new cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await cartManager.getCarts();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error listing the carts", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartManager.getCartById(cartId); //.populate("products") AQUI QUITE ESTO PORQUE LO TENGO EN EL cart-manager-db.js
    //CHECAR SI EN VEZ DE USAR EL CartModel uso cartManager arriba
    if (!cart) {
      console.error("We could not find a cart with the submitted id", error);
      return res.status(404).json({
        error: "Cart was not found",
      });
    }

    return res.json(cart.products);
  } catch (error) {
    console.error("Error getting the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error adding product to the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const updatedCart = await cartManager.removeProductFromCart(
      cartId,
      productId
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error removing product from the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products;
  try {
    const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error updating the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity;
  try {
    const updatedCart = await cartManager.updateProductQuantity(
      cartId,
      productId,
      newQuantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error updating product quantity in the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    await cartManager.clearCart(cartId);
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing the cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Finalizar compra --OJO: PENDIENTE HACER EL FILTRADO DE LOS PRODUCTOSSIN STOCK SUFICIENTE PARA ANTES DEL cartProducts
router.get("/:cid/purchase", async (req, res) => {
  //Llamamos al carrito por su id y a todos sus productos y validamos si hay stock.
  //Si no hay stock no se agrega el producto al carrito y se regresa a un array.
  const cartId = req.params.cid;
  try {
    const cart = await CartModel.findById(cartId).populate("products.product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartProducts = cart.products;
    const unavailableProducts = []; // Array para almacenar los productos no disponibles
    let totalAmount = 0;

    for (const item of cartProducts) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock = product.stock - quantity;
        totalAmount += product.price * quantity;
        await product.save();
      } else {
        unavailableProducts.push(productId);
      }
    }

    //Llamamos al usuario pues necesitamos sus datos para finalizar la compra

    const cartUser = await UserModel.findOne({ cart: cartId });
    if (!cartUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const ticket = new TicketModel({
      purchase_datetime: Date.now(),
      amount: totalAmount,
      purchaser: cartUser.email,
    });
    await ticket.save();
    // Actualizar el carrito para que contenga solo los productos no disponibles
    cart.products = cart.products.filter((item) =>
      unavailableProducts.includes(item.product._id)
    );
    await cart.save();

    res.status(200).json({
      message: "Purchase completed",
      productsNotProcessed: unavailableProducts,
    });
  } catch (error) {
    console.error("Error processing the purchase", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
