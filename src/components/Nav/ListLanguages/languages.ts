import { i18n } from "@/configs/i18n-config";

import { icons } from "./icons";

export const languages = i18n.locales.map((lng) => {
  return {
    code: lng,
    name: lng.toUpperCase(),
    icon: icons[lng],
  };
});
