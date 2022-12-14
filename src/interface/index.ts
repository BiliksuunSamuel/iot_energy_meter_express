export interface IUserInfo {
  name: string;
  phone: string;
  role: number;
  status: number;
}

export interface IAuthInfo {
  userId: string;
  password: string;
}

export interface ILoginParams {
  phone: string;
  password: string;
}

export interface IEnergyInfo {
  energy: number;
  date: string;
}

export interface IVoltageInfo {
  voltage: number;
  date: string;
}
export interface IVoltage {
  _id: string;
  date: string;
  voltate: number;
}
