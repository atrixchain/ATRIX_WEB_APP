// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { IEnvironment } from "./IEnvironment";

const API_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL || "";
console.log("API_LOCAL", API_LOCAL);

export const environment: IEnvironment = {
  production: false,
  apiUrl: API_LOCAL,
};
