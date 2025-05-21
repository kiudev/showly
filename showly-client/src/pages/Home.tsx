// import { auth, db } from "@/config/auth"
import { useNavigate } from "react-router";

export const Home = () => {
  const nav = useNavigate()
  console.log(localStorage.getItem('token'))
  const user = localStorage.getItem('username')

  const handleSignOut = () => {
    localStorage.removeItem('token')
    nav('/')
  }

  return (
    <>
      <h1>Home</h1>
      <h2>Welcome {user}</h2>
      <button className="bg-black p-2 text-white cursor-pointer" onClick={handleSignOut}>Sign Out</button>
    </>
  );
};
