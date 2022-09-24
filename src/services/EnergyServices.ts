import { IEnergyInfo } from "../interface";
import { EnergyModel } from "../models";

export function AddEnergyConsumption(info: IEnergyInfo) {
  return new Promise(function (resolve, reject) {
    try {
      const Info = new EnergyModel(info);
      Info.validate()
        .then(() => {
          Info.save();
          resolve(Info);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export function GetEnergyConsumptions() {
  return new Promise(function (resolve, reject) {
    try {
      EnergyModel.find((error, data) => {
        error && reject(error);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}
