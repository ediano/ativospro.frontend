"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { PageProps } from "@/@types/global";
import { Input } from "@/components/Input";
import { Fieldset } from "@/components/Fieldset";
import { Button } from "@/components/Button";
import { getDictionary } from "@/dictionaries/dictionaries";
import { languages as languagesDefault } from "@/dictionaries/languages";
import { interpolation } from "@/dictionaries/interpolation";
import { CreateUserFormSchema, CreateUserFormState, CreateUserFormStateErrors } from "@/libs/users";

import { languages as languagesThisPage } from "./languages";
import { createUserGraphql } from "@/actions/users";
import { setToken } from "@/services/CookiesToken";

type Props = PageProps;

export default function SignUpPage({ params }: Props) {
  const router = useRouter();
  const dict = getDictionary<(typeof languagesDefault)["en-US"]>(params.locale);
  const { collection, standard } = getDictionary<(typeof languagesThisPage)["en-US"]>(params.locale, languagesThisPage);

  const { register, handleSubmit, formState } = useForm<CreateUserFormState>({
    resolver: zodResolver(CreateUserFormSchema),
  });
  const errors = formState.errors as unknown as CreateUserFormStateErrors;

  async function handleCreateUser(data: CreateUserFormState) {
    const response = await createUserGraphql(data);

    if (!!response?.payload?.accessToken) {
      await setToken(response.payload.accessToken);
      router.push(`/${params.locale}/dashboard`);
    }
  }

  return (
    <div className="flex h-max items-center justify-center">
      <form onSubmit={handleSubmit(handleCreateUser)} className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Input
          type="text"
          label={collection.Name || standard.Name}
          placeholder={collection.Name || standard.Name}
          error={
            errors.name?.message &&
            interpolation(dict.collection.errors[errors.name.message] || dict.standard.errors[errors.name.message], {
              min: 6,
            })
          }
          {...register("name", { required: true })}
        />

        <Fieldset>
          <Input
            type="text"
            label={collection.Email || standard.Email}
            placeholder={collection["you@email.com"] || standard["you@email.com"]}
            error={
              errors.email?.message &&
              (dict.collection.errors[errors.email.message] || dict.standard.errors[errors.email.message])
            }
            {...register("email", { required: true })}
          />

          <Input
            type="password"
            label={collection.Password || standard.Password}
            placeholder={collection.Password || standard.Password}
            error={
              errors.password?.message &&
              interpolation(
                dict.collection.errors[errors.password.message] || dict.standard.errors[errors.password.message],
                { min: 8 },
              )
            }
            {...register("password", { required: true })}
          />
        </Fieldset>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
