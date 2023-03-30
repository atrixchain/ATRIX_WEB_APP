import httpClient from "lib/axios";
import { IAddFaucetParams, IAddFaucetResponse } from "./Faucet.type";

const BASE_URL = "/";

export const FaucetApis = {
  addFaucet: (data: IAddFaucetParams) => {
    return httpClient.post<IAddFaucetResponse>(`${BASE_URL}`, data);
  },
};
