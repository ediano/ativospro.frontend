import { forwardRef, InputHTMLAttributes } from "react";

import { classnames } from "@/libs/classnames";
import { createId } from "@/libs/normalize-text";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, className, type = "text", label, error, ...props }: Props, ref) => {
    const id = !!label ? createId(name + "_" + label) : createId(name);

    return (
      <div className="flex w-full flex-col gap-1">
        {!!label && <label htmlFor={id}>{label}</label>}

        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={classnames(
            "h-10 w-full rounded border border-zinc-200 p-2 dark:bg-[var(--bg-end-hex)]",
            className,
          )}
          {...props}
        />

        {!!error && <span className="text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
