// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { IEnvironment } from "./IEnvironment";

const API_LOCAL = "http://13.212.81.40:3000" || "";
console.log("API_LOCAL", API_LOCAL);

export const environment: IEnvironment = {
  production: false,
  apiUrl: API_LOCAL,
};
