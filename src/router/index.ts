import { ResourceRoutes, UserRoutes } from "./../routes/index";

import express from "express";
import {
  LoginController,
  RegisterController,
} from "../controller/UserController";
import {
  GetEnergyData,
  GetVoltagesController,
} from "../controller/EnergyController";

const router = express.Router();

router.post(UserRoutes.login, LoginController);
router.post(UserRoutes.register, RegisterController);
router.get(ResourceRoutes.get_data, GetEnergyData);
router.get(ResourceRoutes.get_voltage, GetVoltagesController);

export default router;
