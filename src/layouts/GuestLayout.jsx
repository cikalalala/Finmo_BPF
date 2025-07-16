import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3a7e] to-[#26a136] text-white">
      <header className="flex justify-between items-center px-8 py-4 border-b border-white/20">
        <div className="text-2xl font-bold">
          <span className="text-white">FIN</span><span className="text-green-500">MO</span>
        </div>
        <nav className="space-x-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/OurTim">Our Team</Link>
          <Link to="/FAQpage">FAQ Page</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/CustomerRivew">Customer Rivew</Link>
          <Link to="/Login">
            <button className="btn btn-outline btn-sm rounded-full text-white border-white hover:bg-white hover:text-black">
              Login
            </button>
          </Link>
        </nav>
      </header>
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}
