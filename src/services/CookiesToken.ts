"use server";

import { cookies } from "next/headers";

const COOKIES_NAME = "token";

const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

export async function setToken(value: string) {
  const cookie = cookies().set({
    name: COOKIES_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    expires,
  });

  return cookie.get(COOKIES_NAME);
}

export async function getToken() {
  const cookie = cookies().get(COOKIES_NAME);
  return cookie?.value;
}

export async function deleteToken() {
  cookies().delete(COOKIES_NAME);
}
