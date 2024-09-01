"use server";

import { GetHelloDocument, GetHelloQuery } from "@/graphql/earth/generated";
import { getToken } from "@/services/CookiesToken";
import { GraphqlService } from "@/services/GraphqlService";

export async function verifySession() {
  const accessToken = await getToken();
  await GraphqlService(accessToken).query<GetHelloQuery | null | undefined>({ query: GetHelloDocument });
  return true;
}
