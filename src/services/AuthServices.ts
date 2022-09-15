import { IAuthInfo } from "./../interface/index";
import { AuthModel } from "./../models/index";

export function GetAuthById<T>(id: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      AuthModel.findOne({ _id: id }, (error: any, results: any) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetAuthByUserId<T>(id: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      AuthModel.findOne({ userId: id }, (error: any, results: any) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddAuth(info: IAuthInfo) {
  return new Promise(function (resolve, reject) {
    try {
      const Info = new AuthModel(info);
      Info.save();
      resolve(Info);
    } catch (error) {
      reject(error);
    }
  });
}
