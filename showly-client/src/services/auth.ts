import { AuthFormState } from "@/types/auth";
import { toast } from "sonner";
import { SignInWithGoogleAccountProps } from "@/types/auth";

export const signInWithGoogleAccount = async ({
  token,
  nav,
}: SignInWithGoogleAccountProps) => {
  toast.loading("Signing in with Google...");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/sign-in/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);

      nav("/home");

      toast.dismiss();

      toast.success("Successfully signed in with Google", {
        description: "Welcome to Showly!",
      });
    } else {
      throw new Error("Failed to sign in with Google!");
    }
  } catch (error) {
    toast.error("Failed to sign in with Google!");

    console.error("Error signing in:", error);
  }
};

export const createUserWithEmailAndPassword = async ({
  signUp: { email, username, password, passwordConfirmation },
}: AuthFormState) => {
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
          passwordConfirmation,
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const fetchSignIn = async ({
  token,
  nav,
  t
}: SignInWithGoogleAccountProps & { t: (key: string) => string }) => {
  toast.loading(t('toastSignInLoading'));

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/auth/user-cookie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      toast.dismiss();

      toast.success(t('toastSignIn'), {
        description: "Welcome to Showly!",
      });

      nav("/home");
    } else {
      throw new Error("Failed to sign in with email and password!");
    }
  } catch (error) {
    toast.error(t('toastSignInError'));

    console.error("Error signing in:", error);
  }
};
