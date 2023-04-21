import { create } from "zustand";

interface TwitterState {
  point: object | null;
  topPoint: object | null;
  setPoints: (values: any) => void;
  setTopPoint: (values: any) => void;
}
export const useTwitterStore = create<TwitterState>()((set) => ({
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
