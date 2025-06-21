import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100  min-h-screen ">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
