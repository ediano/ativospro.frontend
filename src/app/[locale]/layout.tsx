import "../../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutProps, PageProps } from "@/@types/global";
import { i18n } from "@/configs/i18n-config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { baseUrl } from "@/configs/site";
import { useLocale } from "@/contexts/use-locale";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  const languages = i18n.locales.map((locale) => ({ locale }));
  return languages;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection, standard } = getDictionary(params.locale);

  const pagesByLanguage = i18n.locales.reduce((all, lang) => {
    return { ...all, [lang]: lang };
  }, {});

  return {
    title: {
      template: `%s | ${collection.site.title || standard.site.title}`,
      default: collection.site.title || standard.site.title,
    },
    description: collection.site.description || standard.site.description,
    metadataBase: baseUrl,
    alternates: { canonical: baseUrl, languages: pagesByLanguage },
  };
}

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  useLocale.setState({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <Nav />

        {children}
      </body>
    </html>
  );
}
