import { Hero } from "@/components/main/Hero";
import App from "@/App";
import { Nav } from "@/components/main/nav/Nav";

export const Main = () => {
  return (
    <App>
      <header className="fixed z-1 top-0 flex justify-between items-center py-10 px-40 w-full animate-blur">
        <img
          className="w-56 h-auto object-contain"
          src="images/showly-logo.png"
          alt=""
        />

        <Nav />
      </header>

      <main className="w-full h-screen">
        <Hero />
      </main>
    </App>
  );
};
