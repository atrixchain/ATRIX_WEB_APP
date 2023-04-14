import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { FaucetApis } from "apis/Faucet.api";
import { IAddFaucetParams } from "apis/Faucet.type";
import { queryClient } from "lib/react-query";
import { isEmpty } from "lodash";

const FAUCET_CACHE_KEYS = {
  wallet_address: "wallet_address",
};
type IQueryProps = {
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
};

export const useAddFaucet = ({ onSuccess, onError }: IQueryProps) => {
  return useMutation(
    [FAUCET_CACHE_KEYS.wallet_address],
    (data: IAddFaucetParams) => FaucetApis.addFaucet(data),
    {
      onSuccess(data) {
        onSuccess?.(data?.data);
      },
      onError(data) {
        onError?.(data);
      },
    }
  );
};
