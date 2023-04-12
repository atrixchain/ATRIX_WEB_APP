import { IFaucetProvider } from "apis/Uniswap.type";
import { create } from "zustand";

interface UniState {
  addedProvider: IFaucetProvider | null;
  addedSigner: IFaucetProvider | null;
  addedWallet: string ;
  isConnected: boolean;
  setAddedProvider: (values: IFaucetProvider | null) => void;
  setAddedSigner: (values: IFaucetProvider | null) => void;
  setAddedWallet: (values: string) => void;
  setIsConnected: (values: boolean) => void;
}

export const useUniswapStore = create<UniState>()((set) => ({
  addedProvider: null,
  addedSigner: null,
  addedWallet: "",
  isConnected: false,
  setAddedProvider: async (values) => {
    set({
      addedProvider: values,
    });
  },

  setAddedWallet: async (value) => {
    set({
      addedWallet: value,
    });
  },

  setAddedSigner: async (values) => {
    set({
      addedSigner: values,
    });
  },
  setIsConnected: async (values) => {
    set({
      isConnected: values,
    });
  },
}));
