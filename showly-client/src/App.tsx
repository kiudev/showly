import { Main } from "./pages/Main";

function App() {
  return (
    <div className="flex flex-col justify-center items-center max-w-full min-h-full absolute inset-0 bg-black text-white">
      <header className="absolute z-1 top-10">
        <h1 className="uppercase text-white tracking-widest text-5xl">Showly</h1>
      </header>
      <Main />
    </div>
  );
}

export default App;
