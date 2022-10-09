import { IEnergyInfo, IVoltage, IVoltageInfo } from "../interface";
import { EnergyModel, VoltageModel } from "../models";

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

export function GetVoltages() {
  return new Promise<IVoltage[]>(function (resolve, reject) {
    try {
      VoltageModel.find((error, results: IVoltage[]) => {
        error && reject(error);
        resolve(results as IVoltage[]);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddVoltage(info: IVoltageInfo) {
  return new Promise(function (resolve, reject) {
    try {
      const Info = new VoltageModel(info);
      Info.validate()
        .then(() => {
          Info.save();
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}
