export type ITwitterParams = {
  wallet_address?: string;
  ref_address?: string;
  data?: any;
};

export type ITwitterDatas = {
  id?: string | null;
  twitter_id?: string | null;
  twitter_name?: string | null;
  twitter_username?: string | null;
  wallet_address?: string | null;
};
export type IGetTwitterData = {
  code: string;
  state: string;
};
