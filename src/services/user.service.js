import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";

class UserService {
  async registerUser(userData) {
    const exisitingUser = await UserRepository.getUserByEmail(userData.email);

    if (exisitingUser)
      throw new Error("This user was already registered, please log in");

    //Creamos nuevo carrito
    const newCart = await CartRepository.createCart();
    // y se lo asignamos
    userData.cart = newCart._id;

    userData.password = createHash(userData.password);
    return await UserRepository.createUser(userData);
  }

  async loginUser(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user || !isValidPassword(password, user))
      throw new Error("Wrong credentials");
    return user;
  }
}

//Adaptar despues la clase para incluir forgot password o register si el login no funciona

export default new UserService();
