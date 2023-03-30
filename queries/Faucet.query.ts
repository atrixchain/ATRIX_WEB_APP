import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { FaucetApis } from "apis/Faucet.api";
import { IAddFaucetParams } from "apis/Faucet.type";
import { queryClient } from "lib/react-query";
import { isEmpty } from "lodash";
import { useFaucetStore } from "stores/faucet.store";

const FAUCET_CACHE_KEYS = {
  add_wallet: "add_wallet",
};
type IQueryProps = {
  onSuccess: (data?: any) => void;
  onError: (data?: any) => void;
};

export const useAddBank = ({ onSuccess, onError }: IQueryProps) => {
  const { setAddedWalletAddress } = useFaucetStore();
  return useMutation(
    [FAUCET_CACHE_KEYS.add_wallet],
    (data: IAddFaucetParams) => FaucetApis.addFaucet(data),
    {
      async onSuccess(data) {
        const walletAdded = await data?.data?.wallet_address;
        setAddedWalletAddress(walletAdded);
        return onSuccess(data);
        // window?.open(data?.data?.wallet, '_blank')?.focus();
      },
      async onError(data) {
        return onError(data);
      },
    }
  );
};
