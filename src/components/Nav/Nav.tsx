import { Suspense } from "react";

import { getDictionary } from "@/dictionaries/dictionaries";
import { useLocale } from "@/contexts/use-locale";
import { ListLanguages } from "./ListLanguages/ListLanguages";

export const Nav = () => {
  const locale = useLocale.getState().locale;
  const { collection, standard } = getDictionary(locale);

  return (
    <nav className="-bg-[var(--bg-gradient)] flex h-20 items-center justify-center border-b border-zinc-800 shadow-xl">
      <div className="container flex items-center justify-between">
        <div>{collection.site.title || standard.site.title}</div>

        <Suspense>
          <ListLanguages />
        </Suspense>
      </div>
    </nav>
  );
};
