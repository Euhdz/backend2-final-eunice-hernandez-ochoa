import CartDao from "../dao/cart.dao.js";

//CHECAR SI ES NECESARIO PONER EL TRY...CATCH EN ESTE ARCHIVO O CON EL DEL DAO ES SUFICIENTE
class CartRepository {
  async createCart() {
    try {
      const newCart = await CartDao.createCart();
      return newCart;
    } catch (error) {
      console.error("Error creating the cart", error);
      throw error;
    }
  }

  //CHECAR SI NO ES MEJOR PONER getCartProducts(cartId) EN VEZ DE getCartById(cartId).
  async getCartById(cartId) {
    try {
      const cart = await CartDao.getCartById(cartId);
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
      const cart = await CartDao.addProductToCart(cartId, productId, quantity);
      return cart;
    } catch (error) {
      console.error("Error adding product to the cart", error);
      throw error;
    }
  }

  async updateCart(cartId, updatedProducts) {
    try {
      const cart = await CartDao.updateCart(cartId, updatedProducts);
      return cart;
    } catch (error) {
      console.error("Error updating the cart", error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await CartDao.updateProductQuantity(
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

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartDao.removeProductFromCart(cartId, productId);
      return cart;
    } catch (error) {
      console.error("Error removing product from the cart", error);
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartDao.clearCart(cartId);
      return cart;
    } catch (error) {
      console.error("Error clearing the cart", error);
      throw error;
    }
  }

  async addProductsToTicket(products, code, purchaser) {
    try {
      const ticket = await CartDao.addProductsToTicket(
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

export default new CartRepository();
