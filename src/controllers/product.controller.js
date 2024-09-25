import productRepository from "../repositories/product.repository";

class ProductController {
  async getProducts(req, res) {
    const { limit = 4, page = 1, sort, query } = req.query;
    const products = await productRepository.getProducts({
      limit,
      page,
      sort,
      query,
    });
    res.json(products);
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await productRepository.getProductById(id);
    res.json(product);
  }

  async addProduct(req, res) {
    const product = req.body;
    const newProduct = await productRepository.addProduct(product);
    res.json(newProduct);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await productRepository.updateProduct(id, product);
    res.json(updatedProduct);
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await productRepository.deleteProduct(id);
    res.json(deletedProduct);
  }
}

export default ProductController;
