import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Index() {

  return (
    <div className="h-screen bg-gray-50 text-gray-900">
        <Navbar />

        <main className="-mt-48 px-44 pb-10">
            <Outlet />
        </main>
    </div>
  );
}
