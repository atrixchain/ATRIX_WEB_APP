import { IEnvironment } from "./IEnvironment";

const API_PROD = process.env.NEXT_PUBLIC_API_PROD || "";

export const environment: IEnvironment = {
  production: true,
  apiUrl: API_PROD,
};
