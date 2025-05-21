import { Button } from "@/components/ui/button";
import { auth } from "@/config/auth";
import { signInWithGoogleAccount } from "@/services/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";


export const SignInButton = () => {
  const nav = useNavigate();
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      const token = await user.getIdToken();

      await signInWithGoogleAccount({ token, nav })
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
