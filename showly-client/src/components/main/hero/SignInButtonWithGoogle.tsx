import { Button } from "@/components/ui/button";
import { auth } from "@/config/auth";
import { useLanguageContext } from "@/context/LanguageContext";
import { signInWithGoogleAccount } from "@/services/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

export const SignInButtonWithGoogle = () => {
  const nav = useNavigate();

  const { t } = useLanguageContext();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      const token = await user.getIdToken();

      await signInWithGoogleAccount({ token, nav });
    });
  };

  return (
    <Button
      className="px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      onClick={handleSignIn}
    >
      {t("signInBtnWithGoogle")}
    </Button>
  );
};
