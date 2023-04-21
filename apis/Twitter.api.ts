import httpClient from "lib/axios";
import { IGetTwitterData } from "./Twitter.type";
import { ethers } from "ethers";
const URL = {
  INFO_URL: "/info",
  TWITTER_URL: "/twitter",
  TWITTER_CALLBACK_URL: "/callback",
  TWITTER_CODE_PARAM: "?code=",
  TWITTER_STATE_PARAM: "&state=",
  TWITTER_REQUEST_ASSET: "add-wallet",
  INFO_PARAMS_KEY: "?wallet_address=",
  TOP_POINT_URL: "/top-point",
  REF_URL: "/ref",
};

export const TwitterApis = {
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

  getTwitterDatas: (datas: any) => {
    return httpClient.get<IGetTwitterData>(
      `${URL.TWITTER_URL}${URL.TWITTER_CALLBACK_URL}${URL.TWITTER_CODE_PARAM}${datas.code}${URL.TWITTER_STATE_PARAM}${datas.state}`
    );
  },

  postTwitterWallet: (datas: any) => {
    const checkWallet = ethers.utils.isAddress(datas.wallet_address);
    if (checkWallet === true) {
      return httpClient.post<any>(`${URL.TWITTER_REQUEST_ASSET}`, datas);
    } else {
      throw new Error("invalid wallet address");
    }
  },
};
