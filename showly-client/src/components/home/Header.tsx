import { Nav } from "../Nav";
import { useEffect, useState } from "react";

export const Header = () => {
  const [hideLogo, setHideLogo] = useState<boolean>(false);

  useEffect(() => {
      const handleScroll = () => {
        setHideLogo(window.scrollY > 200);
        console.log(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <header className="fixed z-1 top-0 flex justify-between items-center py-10 px-40 w-full animate-header">
      <img
        className={`w-40 h-auto object-contain logo ${
          hideLogo ? "hidden" : ""
        }`}
        src="images/showly-logo.png"
        alt=""
      />

      <Nav>
        <ul className="flex items-center gap-5">
          <li>Trending</li>
          <li>New</li>
          <li>Popular</li>
        </ul>
      </Nav>
    </header>
  );
};
