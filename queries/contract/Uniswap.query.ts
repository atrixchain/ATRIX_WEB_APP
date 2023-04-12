import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { FaucetApis } from "apis/Uniswap.api";
import { IAddFaucetParams } from "apis/Uniswap.type";
import { queryClient } from "lib/react-query";
import { isEmpty } from "lodash";
import { useFaucetStore } from "stores/uniswap.store";

const UNISWAP_CACHE_KEYS = {
  GET_PROVIDER: "GET_PROVIDER",
};
type IQueryProps = {
  onSuccess: (data?: any) => void;
  onError: (data?: any) => void;
};

// export const useGetProvider = ({ onSuccess, onError }: IQueryProps) => {
//   const { setAddedProvider } = useFaucetStore();
//   return useMutation(
//     [UNISWAP_CACHE_KEYS.GET_PROVIDER],
//     (data: IAddFaucetParams) => FaucetApis.addFaucet(data),
//     {
//       async onSuccess(data) {
//         const walletAdded = await data?.data?.wallet_address;
//         setAddedProvider(walletAdded);
//         return onSuccess(data);
//         // window?.open(data?.data?.wallet, '_blank')?.focus();
//       },
//       async onError(data) {
//         return onError(data);
//       },
//     }
//   );
// };
