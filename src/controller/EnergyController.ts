import { Request, Response } from "express";
import { GetEnergyConsumptions } from "../services/EnergyServices";

export async function GetEnergyData(req: Request, res: Response) {
  try {
    const data = await GetEnergyConsumptions();
    res.send(data);
  } catch (error) {
    res.status(404).send(error);
  }
}
