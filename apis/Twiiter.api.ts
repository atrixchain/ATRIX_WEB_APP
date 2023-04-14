import httpClient from "lib/axios";
import { IGetTwiiterInfo } from "./Twiiter.type";
import { ethers } from "ethers";
const INFO_URL = "/info";
const TOP_POINT_URL = "/top-point";

export const TwiiterApis = {
  getInfo: (wallet: any) => {
    const checkWallet = ethers.utils.isAddress(wallet.wallet_address);
    if (checkWallet === true) {
      return httpClient.post<any>(`${INFO_URL}`, wallet);
    } else {
      throw new Error("invalid wallet address");
    }
  },

  getTopPoint: (wallets: any) => {
    const checkWallet = ethers.utils.isAddress(wallets.wallet_address);
    if (checkWallet === true) {
      return httpClient.get<any>(`${TOP_POINT_URL}`, wallets);
    } else {
      throw new Error("invalid wallet address");
    }
  },
};
