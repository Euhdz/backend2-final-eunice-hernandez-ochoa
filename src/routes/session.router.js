import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";

const router = Router();

//Register

router.post("/register", userController.register);

// Login

router.post("/login", userController.login);

//Current

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.current
);

//Logout

router.post("/logout", userController.logout);

export default router;
