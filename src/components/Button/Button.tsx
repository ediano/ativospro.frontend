import { classnames } from "@/libs/classnames";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ type = "button", className, children, ...rest }: Props) => {
  return (
    <button
      type={type}
      className={classnames(
        "mx-auto flex h-10 w-max cursor-pointer items-center justify-between gap-2 rounded-lg border border-zinc-300 bg-[var(--bg-gradient)] px-6 font-semibold uppercase shadow hover:opacity-70",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
