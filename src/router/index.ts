import { UserRoutes } from "./../routes/index";

import express from "express";
import {
  LoginController,
  RegisterController,
} from "../controller/UserController";

const router = express.Router();

router.post(UserRoutes.login, LoginController);
router.post(UserRoutes.register, RegisterController);

export default router;
