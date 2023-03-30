export type IAddFaucetParams = {
  institution_id: string;
  redirect_url: string;
};
export type IAddFaucetResponse = {
  wallet_address: any;
  id: string;
  wallet : string
};

export type IFaucetDetails = {
  FaucetWallet: IFaucetWalletAccount;
};

export type IFaucetWalletAccount = {
  wallet_id: string;
  wallet_address: string;
};