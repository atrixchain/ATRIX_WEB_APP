import { IEnvironment } from "./IEnvironment";

const API_PROD = process.env.API_PROD || "";

export const environment: IEnvironment = {
  production: true,
  apiUrl: API_PROD,
};
