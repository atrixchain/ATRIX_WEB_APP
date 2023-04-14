import { IUniswapProvider } from "apis/Uniswap.type";
import { create } from "zustand";

interface UniState {
  addedProvider: IUniswapProvider | null;
  addedSigner: IUniswapProvider | null;
  addedWallet: string ;
  isConnected: boolean;
  setAddedProvider: (values: IUniswapProvider | null) => void;
  setAddedSigner: (values: IUniswapProvider | null) => void;
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
