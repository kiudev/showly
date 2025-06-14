// import { auth, db } from "@/config/auth"
import { useLanguageContext } from "@/context/LanguageContext";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Header } from "@/components/home/Header";


interface UserData {
  uid: number;
  email: string;
  username: string;

  picture: string | null;
}

export const Home = ({ children }: { children?: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    uid: 0,
    email: "",
    username: "",
    picture: null,
  });

  const { t } = useLanguageContext();
  const nav = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/auth/user`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          nav("/");
          toast.success(t("toastSignOutTitle"), {
            description: t("toastSignOutDescription"),
          });
        }
      })
      .catch((err) => console.error("Error signing out:", err));
  };

  return (
    <>
      <Header />

      <main className="flex gap-2 relative">
        <aside className="top-[20vh] left-10 w-12 h-[500px] p-1.5 rounded-lg fixed bg-neutral-100/20 backdrop-blur-lg flex flex-col justify-between items-center z-1">
          <UserMenu userData={userData} />

          <button
            className="bg-neutral-100 text-neutral-900 p-2 cursor-pointer rounded-full"
            onClick={handleSignOut}
          >
            <LogOut />
          </button>
        </aside>

        {children}
      </main>
    </>
  );
};

const UserMenu = ({ userData }: { userData: UserData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  // const [animation, setAnimation] = useState<string>("");

  const showUserMenu = () => {
    if (!isVisible) {
      setShouldRender(true);
      setIsVisible(true);
    } else {
      setIsVisible(false); // dispara la animación de salida
      setTimeout(() => setShouldRender(false), 300); // coincide con la duración de la animación
    }
  };

  return (
    <div className="flex">
      <img
        onClick={showUserMenu}
        className="w-10 rounded-full"
        src={
          userData.picture ||
          `https://dummyimage.com/96x96/008080/000000&text=${
            userData.username.split("")[0]
          }`
        }
        alt=""
      />

      {shouldRender && (
        <div
          className={`w-96 h-40 p-5 bg-primary-500/20 absolute left-16 animate-duration-400 ${
            isVisible
              ? "animate-in slide-in-from-left-5 fade-in"
              : "animate-out slide-out-to-left-5 fade-out"
          } rounded-lg`}
        >
          <header className="flex items-center">
            <p>{userData.username}</p>
          </header>
        </div>
      )}
    </div>
  );
};
