import httpClient from "lib/axios";
import { IGetTwiiterInfo } from "./Twiiter.type";
import { ethers } from "ethers";

const URL = {
  INFO_URL: "/info",
  INFO_PARAMS_KEY: "?wallet_address=",
  TOP_POINT_URL: "/top-point",
  REF_URL: "/ref",
};

export const TwiiterApis = {
  getInfo: (wallet: string) => {
    const checkWallet = ethers.utils.isAddress(wallet);
    if (checkWallet === true) {
      return httpClient.get<any>(
        `${URL.INFO_URL}${URL.INFO_PARAMS_KEY}${wallet}`
      );
    } else {
      throw new Error("invalid wallet address");
    }
  },

  getTopPoint: (wallets: any) => {
    const checkWallet = ethers.utils.isAddress(wallets.wallet_address);
    if (checkWallet === true) {
      return httpClient.get<any>(`${URL.TOP_POINT_URL}`, wallets);
    } else {
      throw new Error("invalid wallet address");
    }
  },

  postRef: (wallets: any) => {
    const checkWallet = ethers.utils.isAddress(wallets.wallet_address);
    if (checkWallet === true) {
      return httpClient.post<any>(`${URL.REF_URL}`, wallets);
    } else {
      throw new Error("invalid wallet address");
    }
  },
};
