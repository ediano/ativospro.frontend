import { i18n, Locale } from "@/configs/i18n-config";

import { interpolation } from "./interpolation";
import { languages } from "./languages";

type Collection = (typeof languages)["en-US"];

type Collections<T = unknown> = {
  language: T;
  languageDefault: T;
};

function dictionaries<T = unknown>(locale: Locale, collections?: Collections<T>): T {
  if (!!collections) {
    const collection = collections.language || collections.languageDefault;
    return collection;
  }

  const collection = languages[locale] as T;
  return collection;
}

export function getDictionary<T = Collection>(locale: Locale, collections?: Collections<T>) {
  if (!i18n.locales.includes(locale)) {
    const collection = dictionaries<T>(locale, collections);
    return { collection, interpolation };
  }

  const collection = dictionaries<T>(locale, collections);
  return { collection, interpolation };
}
