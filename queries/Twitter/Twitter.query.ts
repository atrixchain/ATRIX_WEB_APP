import { ITwitterParams } from "../../apis/Twitter.type";
import { useUniswapStore } from "stores/uniswap.store";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { TwitterApis } from "apis/Twitter.api";
import { useTwitterStore } from "stores/twitter.store";
import { queryClient } from "lib/react-query";
import { useRouter } from "next/router";

const TWITTER_CACHE_KEYS = {
  get_info: "get_info",
  get_top_point: "get_top_point",
  post_ref_addresses: "post_ref_addresses",
  get_twitter_datas: "get_twitter_datas",
  post_request_assets: "post_request_assets",

};
type IQueryProps = {
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
};
export const usePostRef = ({ onSuccess, onError }: IQueryProps) => {
  return useMutation(
    [TWITTER_CACHE_KEYS.post_ref_addresses],
    (data: ITwitterParams) => TwitterApis.postRef(data),
    {
      onSuccess: (result: any) => {
        onSuccess(result?.data);
      },
      onError: (err: any) => onError(err?.response?.data),
    }
  );
};
export const useGetInfo = (wallet: string) => {
  const { setPoints } = useTwitterStore();
  return useQuery(
    [TWITTER_CACHE_KEYS.get_info, wallet],
    () => TwitterApis.getInfo(wallet),
    {
      enabled: !!wallet,
      onSuccess: (result: any) => setPoints(result?.data?.data.point.point),
    }
  );
};

export const useGetTopPoint = (data: any) => {
  const { setTopPoint } = useTwitterStore();
  return useQuery(
    [TWITTER_CACHE_KEYS.get_top_point, data],
    () => TwitterApis.getTopPoint(data),
    {
      enabled: !!data.wallet_address,
      onSuccess: (result: any) => {
        setTopPoint(result?.data?.data);
      },
    }
  );
};

export const useGetTwitter = (data: any) => {
  return useQuery(
    [TWITTER_CACHE_KEYS.get_twitter_datas, data],
    () => TwitterApis.getTwitterDatas(data),
    {
      enabled: data.code !== undefined,
      onSuccess: (result: any) => {
        const resultDatas = result?.data?.data;
        sessionStorage.setItem("twitterDatas", JSON.stringify(resultDatas));
      },
    }
  );
};

export const usePostRequestAssets = ({ onSuccess, onError }: IQueryProps) => {
  return useMutation(
    [TWITTER_CACHE_KEYS.post_request_assets],
    (data: ITwitterParams) => TwitterApis.postTwitterWallet(data),
    {
      onSuccess: (result: any) => {
        queryClient.invalidateQueries([TWITTER_CACHE_KEYS.get_top_point]);
        queryClient.invalidateQueries([TWITTER_CACHE_KEYS.get_info]);

        onSuccess(result?.data);
      },
      onError: (err: any) => onError(err?.response?.data),
    }
  );
};
