import { IEnvironment } from "./IEnvironment";

const API_PROD = "http://13.212.81.40:3000" || "";

export const environment: IEnvironment = {
  production: true,
  apiUrl: API_PROD,
};
