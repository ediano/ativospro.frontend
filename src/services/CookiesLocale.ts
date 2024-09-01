"use server";

import { cookies } from "next/headers";

const COOKIES_NAME = "NEXT_LOCALE";

export async function setLocale(value: string) {
  const cookie = cookies().set({ name: COOKIES_NAME, value, path: "/" });
  return cookie.get(COOKIES_NAME);
}

export async function getLocale() {
  const cookie = cookies().get(COOKIES_NAME);
  return cookie?.value;
}
