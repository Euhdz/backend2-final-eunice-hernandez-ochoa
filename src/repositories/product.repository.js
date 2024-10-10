import productDao from "../dao/product.dao.js";

class ProductRepository {
  async getProducts({ limit = 4, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;
      const products = await productDao.getProducts({
        limit,
        page,
        sort,
        query,
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
  async getProductById(id) {
    try {
      const product = await productDao.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await productDao.addProduct(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await productDao.updateProduct(id, product);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id) {
    try {
      const deletedProduct = await productDao.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
