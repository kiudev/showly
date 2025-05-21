import { ControllerRenderProps } from "react-hook-form";
import { ChangeEvent } from "react";

export interface SignInWithGoogleAccountProps {
  token: string;
  nav: (path: string) => void;
}

export interface AuthFormState {
  signUp: {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
  };
  signIn: {
    email: string;
    password: string;
  };
}

export interface CustomFormItemProps {
  label: string;
  placeholder: string;
  type: string;
  signUpField?: ControllerRenderProps<
    {
      email: string;
      password: string;
      passwordConfirmation: string;
      username: string;
    },
    "username" | "email" | "password" | "passwordConfirmation"
  >;
  signInField?: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "email" | "password"
  >;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}
