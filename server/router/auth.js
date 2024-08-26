import { Router } from "express";
import userController from "../controllers/user.js";
import handleValidationError from "../utils/validation/errors-validators.js";
import userRegistrationValidation from "../utils/validation/user-validators.js";
import middlewaresAuth from "../migglewares/middlewares-auth.js";

const router = new Router();

router.post(
  "/registration",
  userRegistrationValidation,
  handleValidationError,
  userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", middlewaresAuth, userController.getUsers);

export default router;
