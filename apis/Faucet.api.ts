import httpClient from "lib/axios";
// import { IAddFaucetParams, IAddFaucetWallet } from "./Faucet.type";
import { ethers } from "ethers";
const BASE_URL = "/faucet";

export const FaucetApis = {
  addFaucet: (wallet?: any) => {
    const checkWallet = ethers.utils.isAddress(wallet.wallet_address);
    if (checkWallet === true) {
      return httpClient.post<any>(`${BASE_URL}`, wallet);
    } else {
      throw new Error("invalid wallet address");
    }
  },
};
