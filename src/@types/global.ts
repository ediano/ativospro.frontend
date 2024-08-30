import { Locale } from "@/configs/i18n-config";

export type LayoutProps = {
  children: React.ReactNode;
  params: { lang: Locale };
};

export type PageProps = { params: { lang: Locale } };
