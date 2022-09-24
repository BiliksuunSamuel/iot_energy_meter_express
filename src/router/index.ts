import { ResourceRoutes, UserRoutes } from "./../routes/index";

import express from "express";
import {
  LoginController,
  RegisterController,
} from "../controller/UserController";
import { GetEnergyData } from "../controller/EnergyController";

const router = express.Router();

router.post(UserRoutes.login, LoginController);
router.post(UserRoutes.register, RegisterController);
router.get(ResourceRoutes.get_data, GetEnergyData);

export default router;
