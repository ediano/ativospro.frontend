"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { i18n, Locale } from "@/configs/i18n-config";
import { setLocale } from "@/services/CookiesLocale";
import { icons } from "./icons";
import { languages } from "./languages";

export const ListLanguages = () => {
  const params = useParams() as unknown as { locale: Locale };
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePathname = (code: Locale) => {
    const query = searchParams.toString();
    const url = pathname.replace(params.locale, code);
    if (!query) return url;
    return url + `?${query}`;
  };

  async function handleSetLocaleClick(code: Locale) {
    await setLocale(code);
  }

  return (
    <div className="group/nav-languages relative">
      <button className="rounded-md bg-[var(--bg-start-hex)] p-2 shadow-lg">{icons[params.locale]}</button>

      <div className="absolute z-10 hidden min-w-max pt-2 group-hover/nav-languages:flex">
        <ul className="flex flex-col gap-2">
          {languages.map(({ code, icon }) => {
            if (params.locale === code) return null;

            return (
              <li key={code} className="rounded-md bg-[var(--bg-start-hex)] p-2 hover:bg-[var(--bg-end-hex)]">
                <Link href={handlePathname(code)} onClick={() => handleSetLocaleClick(code)}>
                  {icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
