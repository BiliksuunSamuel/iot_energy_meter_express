import { IAuthInfo, ILoginParams, IUserInfo } from "./../interface/index";
import { Request, Response } from "express";
import { AddUser, GetUserByPhone } from "../services/UserServices";
import { AddAuth, GetAuthByUserId } from "../services/AuthServices";
import { HashPassword, VerifyPassword } from "../utils";

interface IUser extends IUserInfo {
  _id: string;
}

interface IAuth extends IAuthInfo {
  _id: string;
}

interface IRegisterInfo extends IUserInfo {
  password: string;
}
export async function LoginController(req: Request, res: Response) {
  try {
    const data: ILoginParams = req.body;
    const info = await GetUserByPhone<IUser>(data.phone);
    if (info) {
      const auth = await GetAuthByUserId<IAuth>(info._id);
      const match = await VerifyPassword<boolean>(data.password, auth.password);
      if (match) {
        res.send(info);
      } else {
        res.status(404).send("Invalid Login Password");
      }
    } else {
      res.status(404).send("Invalid Login Phone Number");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Request Failed, Server Network Error");
  }
}

export async function RegisterController(req: Request, res: Response) {
  try {
    const data: IRegisterInfo = req.body;
    data.password = await HashPassword<string>(data.password);
    const phone = await GetUserByPhone<IUser>(data.phone);
    if (phone) {
      res.status(404).send(`Phone Number =${data.phone} Is Already Registered`);
    } else {
      const Info: any = await AddUser<IUser>(data);
      await AddAuth({ password: data.password, userId: Info._id });
      res.send(Info);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Request Failed, Server Network Error");
  }
}
