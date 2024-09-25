import bcrypt from "bcrypt";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

//Cart utils (esto se podría poner en un archivo aparteque se llame cart.utils.js)
const calculateTotal = (products) => {
  let total = 0;

  products.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  return total;
};

export { createHash, isValidPassword, calculateTotal };
