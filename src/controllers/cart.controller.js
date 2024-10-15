import CartRepository from "../repositories/cart.repository.js";
import ticketRepository from "../repositories/ticket.repository.js";
import CartModel from "../models/cart.model.js";
import cartDao from "../dao/cart.dao.js";

class CartController {
  async createCart() {
    try {
      const newCart = await CartRepository.createCart();
      return newCart;
    } catch (error) {
      console.error("Error creating the cart", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartRepository.getCartById(cartId);
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
      const cart = await CartRepository.addProductToCart(
        cartId,
        productId,
        quantity
      );
      return cart;
    } catch (error) {
      console.error("Error adding product to the cart", error);
      throw error;
    }
  }
  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartRepository.removeProductFromCart(
        cartId,
        productId
      );
      return cart;
    } catch (error) {
      console.error("Error removing product from the cart", error);
      throw error;
    }
  }
  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await CartRepository.updateProductQuantity(
        cartId,
        productId,
        newQuantity
      );
      return cart;
    } catch (error) {
      console.error("Error updating product quantity in the cart", error);
      throw error;
    }
  }
  async clearCart(cartId) {
    try {
      const cart = await CartRepository.clearCart(cartId);
      return cart;
    } catch (error) {
      console.error("Error clearing the cart", error);
      throw error;
    }
  }

  async addProductsToTicket(products, code, purchaser) {
    try {
      const ticket = await ticketRepository.addProductsToTicket(
        products,
        code,
        purchaser
      );
      return ticket;
    } catch (error) {
      console.error("Error adding products to the ticket", error);
      throw error;
    }
  }
}

export default CartController;
