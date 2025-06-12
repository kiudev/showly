import "flag-icons/css/flag-icons.min.css";
import { ReactNode } from "react";

function App({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen bg-primary-800 text-neutral-100 flex flex-col justify-center items-center font-inter">
      {children}
    </div>
  );
}

export default App;
