import { Locale } from "@/configs/i18n-config";

export type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export type PageProps = {
  params: { locale: Locale };
};
