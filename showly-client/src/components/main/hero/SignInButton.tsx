import { Button } from "@/components/ui/button";
import { auth } from "@/config/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const SignInButton = () => {
  const nav = useNavigate();
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      const token = await user.getIdToken();

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

          toast.success("Successfully signed in with Google", {
            description: "Welcome to Showly!"
          });
        } else {
          throw new Error("Failed to sign in with Google");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    });
  };

  return (
    <Button
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
      onClick={handleSignIn}
    >
      Continue with Google
    </Button>
  );
};
