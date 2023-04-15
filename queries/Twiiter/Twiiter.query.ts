import { ITwiiterParams } from "./../../apis/Twiiter.type";
import { useUniswapStore } from "stores/uniswap.store";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { TwiiterApis } from "apis/Twiiter.api";
import { useTwiiterStore } from "stores/twiiter.store";

const TWIITER_CACHE_KEYS = {
  get_info: "get_info",
  get_top_point: "get_top_point",
  post_ref_addresses: "post_ref_addresses",
};
type IQueryProps = {
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
};
export const usePostRef = ({ onSuccess, onError }: IQueryProps) => {
  return useMutation(
    [TWIITER_CACHE_KEYS.post_ref_addresses],
    (data: ITwiiterParams) => TwiiterApis.postRef(data),
    {
      onSuccess: (result: any) => onSuccess(result?.data),
      onError: (err: any) => onError(err?.response?.data),
    }
  );
};
export const useGetInfo = () => {
  const { setPoints } = useTwiiterStore();
  return useMutation(
    [TWIITER_CACHE_KEYS.get_info],
    (data: ITwiiterParams) => TwiiterApis.getInfo(data),
    {
      onSuccess: (result: any) => setPoints(result?.data?.data.point.point),
    }
  );
};

export const useGetTopPoint = (data: any) => {
  const { setTopPoint } = useTwiiterStore();
  return useQuery(
    [TWIITER_CACHE_KEYS.get_top_point, data],
    () => TwiiterApis.getTopPoint(data),
    {
      onSuccess: (result: any) => setTopPoint(result?.data?.data),
    }
  );
};