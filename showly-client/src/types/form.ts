import { ControllerRenderProps } from "react-hook-form";
import { ChangeEvent } from "react";

export interface FormState {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string
}

export interface CustomFormItemProps {
  label: string;
  placeholder: string;
  type: string;
  field: ControllerRenderProps<
    {
      username: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    "username"
  >;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}
