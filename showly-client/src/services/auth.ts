import { FormState } from "@/types/form";

export const createUserWithEmailAndPassword = async ({
  email,
  password,
  username,
  passwordConfirmation,
}: FormState) => {
  try {
    await fetch(
      import.meta.env.VITE_API_URL + "/users/sign-up/email-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          passwordConfirmation
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
};
