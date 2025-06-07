import { Hero } from "@/components/main/Hero";
import App from "@/App";
import { Nav } from "@/components/main/nav/Nav";

export const Main = () => {
  return (
    <App>
      <header className="fixed z-1 top-10 flex justify-between items-center px-40 w-full">
        <img
          className="w-56 h-auto object-contain"
          src="images/showly-logo.png"
          alt=""
        />

        <Nav />
      </header>

      <main className="flex flex-col gap-5 items-center w-full h-full">
        <Hero />
      </main>

      <div className="w-full h-96">

      </div>
    </App>
  );
};
