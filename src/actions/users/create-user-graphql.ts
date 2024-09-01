"use server";

import { CreateUserDocument, CreateUserMutation, MutationCreateUserArgs } from "@/graphql/earth/generated";
import { CreateUserFormState } from "@/libs/users";
import { GraphqlService } from "@/services/GraphqlService";

export async function createUserGraphql(data: CreateUserFormState) {
  const { name, email, password } = data;

  const response = await GraphqlService().mutate<CreateUserMutation, MutationCreateUserArgs>({
    mutation: CreateUserDocument,
    variables: { data: { name, email, password } },
  });

  return response.data;
}
