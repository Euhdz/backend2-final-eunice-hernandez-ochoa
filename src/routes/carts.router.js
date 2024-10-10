import { Router } from "express";
const router = Router();
import { calculateTotal } from "../utils/util.js";

import CartController from "../controllers/cart.controller.js";
const cartController = new CartController();

router.post("/", cartController.createCart);

//router.get("/", cartController.getCarts);

router.get("/:cid", cartController.getCartById);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.delete("/:cid/product/:pid", cartController.removeProductFromCart);

//router.put("/:cid", cartController.updateCart); //CHECAR SI EN EL CONTROLADOR TENGO ESTA FUNCION

// router.put("/:cid", async (req, res) => {
//   const cartId = req.params.cid;
//   const updatedProducts = req.body.products;
//   try {
//     const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
//     res.json(updatedCart.products);
//   } catch (error) {
//     console.error("Error updating the cart", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.put("/:cid/product/:pid", cartController.updateProductQuantity);

router.delete("/:cid", cartController.clearCart);

router.get("/:cid/purchase", cartController.addProductsToTicket); //CHECAR SI ESTA RUTA ES CORRECTA

//CHECAR COMO MODIFICAR LO SIGUIENTE

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
