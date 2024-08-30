import type { Metadata } from "next";
import { LayoutProps } from "@/@types/global";
import { i18n } from "@/configs/i18n-config";
import { baseUrl } from "@/configs/site";

export async function generateMetadata(): Promise<Metadata> {
  const languages = i18n.locales.reduce((all, lang) => {
    return { ...all, [lang]: `${lang}/login` };
  }, {});

  return {
    title: "Login",
    alternates: { canonical: baseUrl, languages },
  };
}

export default async function LoginLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
