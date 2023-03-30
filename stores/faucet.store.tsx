import { IFaucetWalletAccount } from 'apis/Faucet.type';
import create from 'zustand';

interface FaucetState {
  addedWalletAddress: IFaucetWalletAccount | null;
  setAddedWalletAddress: (values: IFaucetWalletAccount | null) => void;
}

export const useFaucetStore = create<FaucetState>()((set) => ({
  addedWalletAddress: null,
  setAddedWalletAddress: async (values) => {
    set({
      addedWalletAddress: values,
    });
  },
}));
