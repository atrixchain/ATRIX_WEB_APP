export type ITwitterParams = {
  wallet_address?: string;
  ref_address?: string;
  data?: any;
};

export type ITwitterDatas = {
  id?: string;
  twitter_id?: string;
  twitter_name?: string;
  twitter_username?: string;
  wallet_address?: string;
};
export type IGetTwitterData = {
  code: string;
  state: string;
};
