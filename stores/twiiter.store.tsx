import { IUniswapProvider } from "apis/Uniswap.type";
import { create } from "zustand";

interface TwiiterState {
  point: object | null;
  topPoint : object | null;
  setPoints: (values: any) => void;
  setTopPoint: (values: any) => void;
}
export const useTwiiterStore = create<TwiiterState>()((set) => ({
  point: null,
  topPoint: null,
  setPoints: async (values) => {
    set({
      point: values,
    });
  },
  setTopPoint: async (values) => {
    set({
      topPoint: values,
    });
  },
}));
