import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;

    try {
      //Checar si está ok meter lo del cart aquí
      const cart = new Cart();
      await cart.save();

      const newUser = await userService.registerUser({
        first_name,
        last_name,
        email,
        age,
        password,
        cart_id: cart._id,
      });

      const token = jwt.sign(
        {
          username: `${newUser.first_name} ${newUser.last_name}`, //Cambié aquí lo de usuario a username, checar si no causa problemas
          email: newUser.email,
          role: newUser.role,
        },
        "coderhouse",
        { expiresIn: "1h" }
      );

      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.redirect("/api/sessions/current"); //CHECAR SI aqui deberia decir /api/sessions/profile
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.loginUser(email, password);
      const token = jwt.sign(
        {
          username: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        },
        "coderhouse",
        { expiresIn: "1h" }
      );

      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.redirect("/api/sessions/current"); //CHECAR SI aqui deberia decir /api/sessions/profile
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

  async current(req, res) {
    //CHECAR SI aqui deberia decir profile(req, res)

    if (req.user) {
      const user = req.user;
      const userDTO = new UserDTO(user);
      res.render("profile", { user: userDTO });
    } else {
      res.send("Not authorized");
    }
  }

  logout(req, res) {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
  }
}

export default new UserController();
