import { UserSchema, AuthSchema } from "./../schema/index";

import mongoose from "mongoose";

export const UserModel = mongoose.model("user", UserSchema);
export const AuthModel = mongoose.model("auth", AuthSchema);
