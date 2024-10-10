import UserDao from "../dao/user.dao.js";

class UserRepository {
  async createUser(userData) {
    return await UserDao.save(userData);
  }

  async getUserById(id) {
    return await UserDao.findById(id);
  }

  async getUserByEmail(email) {
    return await UserDao.findOne({ email });
  }

  async updateUser(id, userData) {
    return await UserDao.updateOne({ _id: id }, userData);
  }

  async deleteUser(id) {
    return await UserDao.deleteOne({ _id: id });
  }

  async getAllUsers() {
    return await UserDao.find({});
  }

  async getUserByUsername(username) {
    return await UserDao.findOne({ username });
  }
}

export default new UserRepository();
