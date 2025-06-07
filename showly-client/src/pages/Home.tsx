// import { auth, db } from "@/config/auth"
import { useLanguageContext } from "@/context/LanguageContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Nav } from "@/components/main/nav/Nav";
interface UserData {
  uid: number;
  email: string;
  username: string;
}

export const Home = () => {
  const [userData, setUserData] = useState<UserData>({
    uid: 0,
    email: "",
    username: "",
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
      <header className="sticky top-0 z-1 flex justify-between items-center min-w-screen px-40 py-3 bg-primary-500">
        <img
          className="w-32 h-auto object-contain"
          src="images/showly-logo.png"
          alt=""
        />

        <Nav />
      </header>

      <main className="flex justify-end items-center w-screen gap-2">
        <aside className="sticky left-0 w-60 h-screen bg-primary-900 p-5 rounded-lg">
          <h1>Home</h1>
          <h2>Welcome {userData.username}</h2>
        </aside>

        <div className="bg-primary-900 p-5 rounded-lg w-screen h-screen">
          <button
            className="bg-neutral-100 text-neutral-900 p-2 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </main>
    </>
  );
};
