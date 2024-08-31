"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageProps } from "@/@types/global";
import { Input } from "@/components/Input";
import { Fieldset } from "@/components/Fieldset";
import { getDictionary } from "@/dictionaries/dictionaries";
import { languages } from "./languages";
import { languages as languagesDefault } from "@/dictionaries/languages";
import { interpolation } from "@/dictionaries/interpolation";

const lngErrors = languagesDefault["en-US"].errors;

const createUserFormSchema = z.object({
  name: z
    .string({ required_error: lngErrors["Name is required"] })
    .min(6, { message: lngErrors["Must have at least {{min}} characters"] }),
  email: z.string({ required_error: lngErrors["Email is required"] }).email({ message: lngErrors["Invalid email"] }),
  password: z
    .string({ required_error: lngErrors["Password is required"] })
    .min(8, { message: lngErrors["Must have at least {{min}} characters"] }),
});

type CreateUserForm = z.infer<typeof createUserFormSchema>;
type CreateUserFormErrors = CreateUserForm & {
  [K in keyof CreateUserForm]: { message: keyof typeof lngErrors };
};

export default function SignUpPage({ params }: PageProps) {
  const dict = getDictionary<(typeof languagesDefault)["en-US"]>(params.lang);
  const { collection, standard } = getDictionary<(typeof languages)["en-US"]>(params.lang, languages);

  const { register, handleSubmit, formState } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserFormSchema),
  });
  const errors = formState.errors as unknown as CreateUserFormErrors;

  const onHandleSubmit = async (data: CreateUserForm) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Input
          type="text"
          label={collection.Name || standard.Name}
          placeholder={collection.Name || standard.Name}
          error={
            !!errors.name?.message &&
            interpolation(dict.collection.errors[errors.name.message] || dict.standard.errors[errors.name.message], {
              min: 6,
            })
          }
          {...register("name")}
        />

        <Fieldset>
          <Input
            type="text"
            label={collection.Email || standard.Email}
            placeholder={collection["you@email.com"] || standard["you@email.com"]}
            error={
              !!errors.email?.message &&
              (dict.collection.errors[errors.email.message] || dict.standard.errors[errors.email.message])
            }
            {...register("email")}
          />

          <Input
            type="password"
            label={collection.Password || standard.Password}
            placeholder={collection.Password || standard.Password}
            error={
              !!errors.password?.message &&
              interpolation(
                dict.collection.errors[errors.password.message] || dict.standard.errors[errors.password.message],
                { min: 8 },
              )
            }
            {...register("password")}
          />
        </Fieldset>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
