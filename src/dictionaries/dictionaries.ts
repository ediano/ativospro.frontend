import { i18n, Locale } from "@/configs/i18n-config";

import { languages } from "./languages";

type Collection = (typeof languages)["en-US"];

type Collections<T = unknown> = {
  [K in Locale]: T;
};

function dictionaries<T = unknown>(locale: Locale, collections?: Collections<T>) {
  if (!!collections) {
    const collection = collections[locale];
    const standard = collections[i18n.defaultLocale];
    return { collection, standard };
  }

  const collection = languages[locale] as T;
  const standard = languages[i18n.defaultLocale] as T;

  return { collection, standard };
}

export function getDictionary<T = Collection>(locale: Locale, collections?: Collections<T>) {
  if (!i18n.locales.includes(locale)) {
    const dictionary = dictionaries<T>(i18n.defaultLocale, collections);
    return dictionary;
  }

  const dictionary = dictionaries<T>(locale, collections);
  return dictionary;
}
