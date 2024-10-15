import ProductDao from "../dao/product.dao.js";

class ProductRepository {
  async getProducts({ limit = 4, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;
      const products = await ProductDao.getProducts({
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
      const product = await ProductDao.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await ProductDao.addProduct(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await PageTransitionEventroductDao.updateProduct(
        id,
        product
      );
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id) {
    try {
      const deletedProduct = await ProductDao.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
