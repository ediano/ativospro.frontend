import "../../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutProps, PageProps } from "@/@types/global";
import { i18n } from "@/configs/i18n-config";
import { getDictionary } from "@/dictionaries/dictionaries";
import { baseUrl } from "@/configs/site";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }));
  return languages;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection } = getDictionary(params.lang);

  const languages = i18n.locales.reduce((all, lang) => {
    return { ...all, [lang]: lang };
  }, {});

  return {
    title: {
      template: `%s | ${collection.site.title}`,
      default: collection.site.title,
    },
    description: collection.site.description,
    metadataBase: baseUrl,
    alternates: { canonical: baseUrl, languages },
  };
}

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
