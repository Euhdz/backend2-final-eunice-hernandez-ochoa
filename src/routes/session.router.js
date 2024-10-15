import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

//POR QUE SE IMPORTA userController? No debiera ser UserController?

const router = Router();

//Register

router.post("/register", UserController.register);

// Login

router.post("/login", UserController.login);

//Current

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.current
);

//Logout

router.post("/logout", UserController.logout);

export default router;
