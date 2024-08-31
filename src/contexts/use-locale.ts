import { Locale } from "@/configs/i18n-config";
import { create } from "zustand";

type UseLocal = {
  lang: Locale;
  set: (lang: Locale) => void;
};

const createUseLocale = create<UseLocal>();

export const useLocale = createUseLocale((set) => {
  return {
    lang: "en-US",
    set: (lang: Locale) => set({ lang }),
  };
});
