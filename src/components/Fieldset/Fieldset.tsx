import { forwardRef, DetailedHTMLProps, FieldsetHTMLAttributes } from "react";

import { classnames } from "@/libs/classnames";

type Props = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;

export const Fieldset = ({ children, className, ...props }: Props) => {
  return (
    <fieldset className={classnames("flex gap-4", className)} {...props}>
      {children}
    </fieldset>
  );
};
