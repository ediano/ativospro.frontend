import { Locale } from "@/configs/i18n-config";
import { create } from "zustand";

type UseLocal = {
  locale: Locale;
  set: (locale: Locale) => void;
};

const createUseLocale = create<UseLocal>();

export const useLocale = createUseLocale((set) => {
  return {
    locale: "en-US",
    set: (locale: Locale) => set({ locale }),
  };
});
