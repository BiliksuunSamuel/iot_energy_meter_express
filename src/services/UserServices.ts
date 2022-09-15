import { IUserInfo } from "./../interface/index";
import { UserModel } from "./../models/index";

export function GetUserByPhone<T>(phone: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.findOne({ phone }, (error: any, results: any) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetUserById<T>(id: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.findOne({ _id: id }, (error: any, results: any) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetUsers<T>() {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.find((error, results: any) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddUser<T>(info: IUserInfo) {
  return new Promise<T>(function (resolve, reject) {
    try {
      const Info: any = new UserModel(info);
      Info.save();
      resolve(Info);
    } catch (error) {
      reject(error);
    }
  });
}
