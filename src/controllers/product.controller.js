import ProductRepository from "../repositories/product.repository.js";

class ProductController {
  async getProducts(req, res) {
    const { limit = 4, page = 1, sort, query } = req.query;
    const products = await ProductRepository.getProducts({
      limit,
      page,
      sort,
      query,
    });
    res.json(products);
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await ProductRepository.getProductById(id);
    res.json(product);
  }

  async addProduct(req, res) {
    const product = req.body;
    const newProduct = await ProductRepository.addProduct(product);
    res.json(newProduct);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await ProductRepository.updateProduct(id, product);
    res.json(updatedProduct);
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await ProductRepository.deleteProduct(id);
    res.json(deletedProduct);
  }
}

export default ProductController;
