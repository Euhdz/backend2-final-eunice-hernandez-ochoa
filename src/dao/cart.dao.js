import CartModel from "../models/cart.model.js";
import TicketModel from "../models/ticket.model.js";
import { calculateTotal } from "../utils/util.js";

class CartDao {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error("Error creating the cart", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate("products");
      if (!cart) {
        console.error("We could not find a cart with the submitted id", error);
        return null;
      }
      return cart;
    } catch (error) {
      console.error("Error getting the cart", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      const existingProduct = cart.products.find(
        (p) => p.product._id.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error adding product to the cart", error);
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId
      );
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error removing product from the cart", error);
      throw error;
    }
  }

  async updateCart(cartId, updatedProducts) {
    try {
      const cart = await this.getCartById(cartId);
      cart.products = updatedProducts;
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error updating the cart", error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await this.getCartById(cartId);
      const existingProduct = cart.products.find(
        (p) => p.product._id.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity = newQuantity;
        cart.markModified("products");
        await cart.save();
        return cart;
      } else {
        throw new Error(
          `The product with id ${productId} was not found in cart`
        );
      }
    } catch (error) {
      console.error("Error updating product quantity in the cart", error);
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      cart.products = [];
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error clearing the cart", error);
      throw error;
    }
  }

  async addProductsToTicket(products, code, purchaser) {
    try {
      const ticket = new TicketModel({
        code,
        purchase_datetime: new Date(),
        amount: calculateTotal(products),
        purchaser,
      });
      await ticket.save();
      return ticket;
    } catch (error) {
      throw new Error("Error");
    }
  }
}

export default new CartDao();
