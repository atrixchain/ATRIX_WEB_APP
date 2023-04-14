import httpClient from "lib/axios";
import { IGetTwiiterInfo } from "./Twiiter.type";
import { ethers } from "ethers";
const INFO_URL = "/info";
const TOP_POINT_URL = "/top-point";

export const TwiiterApis = {

  getInfo: (wallet: any) => {
    const checkWallet = ethers.utils.isAddress(wallet.wallet_address);
    if (checkWallet === true) {
      return httpClient.post<IGetTwiiterInfo>(`${INFO_URL}`, wallet);
    }
  },

  getTopPoint: (wallets: any) => {
    const checkWallet = ethers.utils.isAddress(wallets.wallet_address);
    if (checkWallet === true) {
      return httpClient.get<IGetTwiiterInfo>(`${TOP_POINT_URL}`, wallets);
    }
  },
};
