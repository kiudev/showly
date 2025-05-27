// import { auth, db } from "@/config/auth"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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

  const nav = useNavigate()

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
          nav("/")
          toast.success("User has been signed out successfully", {
            description: "We hope to see you again soon! 👋",
          })
        }
      })
      .catch((err) => console.error("Error signing out:", err));
  };

  return (
    <>
      <h1>Home</h1>
      <h2>Welcome {userData.username}</h2>
      <button
        className="bg-black p-2 text-white cursor-pointer"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </>
  );
};
