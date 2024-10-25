import { create } from "zustand";

type State = {
  messages: string[];
  shouldRedirect: boolean;
  add: (message: string, redirect?: boolean) => void;
  addAll: (message: string[], redirect?: boolean) => void;
  removeAll: () => void;
};

export const useErrorStore = create<State>((set) => {
  return {
    messages: [],
    shouldRedirect: false,
    add: (message: string, redirect = false) => {
      return set((state: any) => {
        return { messages: [...state.error.messages, message], redirect };
      });
    },
    addAll: (messages: string[], redirect = false) => {
      return set((state: any) => ({ messages: [...state.error.messages, ...messages], redirect }));
    },
    removeAll: () => set({ messages: [], shouldRedirect: false }),
  };
});
