import { Request, Response } from "express";
import { IVoltageInfo } from "../interface";
import {
  AddVoltage,
  GetEnergyConsumptions,
  GetVoltages,
} from "../services/EnergyServices";

export async function GetEnergyData(req: Request, res: Response) {
  try {
    const data = await GetEnergyConsumptions();
    res.send(data);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function GetVoltagesController(req: Request, res: Response) {
  try {
    res.send(await GetVoltages());
  } catch (error) {
    res.sendStatus(403);
  }
}

export async function AddVoltageController(req: Request, res: Response) {
  try {
    const data: IVoltageInfo = req.body;
    await AddVoltage(data);
    res.send(await GetVoltages());
  } catch (error) {
    res.sendStatus(403);
  }
}
