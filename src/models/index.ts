import {
  UserSchema,
  AuthSchema,
  EnergySchema,
  VoltageSchema,
} from "./../schema/index";

import mongoose from "mongoose";

export const UserModel = mongoose.model("user", UserSchema);
export const AuthModel = mongoose.model("auth", AuthSchema);
export const EnergyModel = mongoose.model("energy", EnergySchema);
export const VoltageModel = mongoose.model("voltage", VoltageSchema);
