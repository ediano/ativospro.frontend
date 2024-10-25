import { z } from "zod";

import { languages } from "@/dictionaries/languages";
const lngErrors = languages["en-US"].errors;

export const CreateUserFormSchema = z.object({
  name: z
    .string({ required_error: lngErrors["Name is required"] })
    .min(6, { message: lngErrors["Must have at least {{min}} characters"] }),
  email: z.string({ required_error: lngErrors["Email is required"] }).email({ message: lngErrors["Invalid email"] }),
  password: z
    .string({ required_error: lngErrors["Password is required"] })
    .min(8, { message: lngErrors["Must have at least {{min}} characters"] }),
});

export type CreateUserFormState = z.infer<typeof CreateUserFormSchema>;

export type CreateUserFormStateErrors = {
  [K in keyof CreateUserFormState]?: { message: keyof typeof lngErrors };
};
