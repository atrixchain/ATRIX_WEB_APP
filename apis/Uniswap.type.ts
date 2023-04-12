export type IAddFaucetParams = {
  addedProvider: object;
  setAddedProvider: object;
};
export type IAddFaucetResponse = {
  provider: object;
};

export type IFaucetDetails = {
  FaucetWallet: IFaucetProvider;
};

export type IFaucetProvider = {
  provider: any;
  wallet: string;
  signer: any;
};
