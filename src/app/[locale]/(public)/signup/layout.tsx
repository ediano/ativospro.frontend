import type { Metadata } from "next";
import { LayoutProps, PageProps } from "@/@types/global";
import { i18n } from "@/configs/i18n-config";
import { baseUrl } from "@/configs/site";

import { getDictionary } from "@/dictionaries/dictionaries";
import { languages } from "./languages";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection, standard } = getDictionary<(typeof languages)["en-US"]>(params.locale, languages);

  const pagesByLanguage = i18n.locales.reduce((all, locale) => {
    return { ...all, [locale]: `${locale}/signup` };
  }, {});

  return {
    title: collection.title || standard.title,
    alternates: { canonical: baseUrl, languages: pagesByLanguage },
  };
}

export default async function SignUpLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
