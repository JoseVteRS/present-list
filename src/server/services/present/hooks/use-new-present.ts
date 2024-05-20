import { create } from "zustand";

type NewPresentState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPresent = create<NewPresentState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
