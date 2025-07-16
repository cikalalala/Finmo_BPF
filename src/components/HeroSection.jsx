import { Link, NavLink } from "react-router-dom";
import About from "../pages/Guest/About";
import OurTeam from "../pages/guest/OurTim";
import FAQpage from "../pages/guest/FAQpage";
import Contact from "../pages/guest/Contact";
import CustomerReview from "../pages/guest/CustomerReview";

export default function HeroSection() {
  return (
     <div>
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 max-w-7xl mx-auto">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold">
          Atur <span className="text-green-500">Keuanganmu</span>, Capai
          Impianmu
        </h1>
        <p className="text-white/90 text-lg leading-relaxed max-w-md">
          Website manajemen keuangan yang dirancang khusus untuk mahasiswa.
          Catat pengeluaran, kelola pemasukan, dan capai target tabungan dengan
          mudah dan teratur.
        </p>
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="btn btn-warning font-semibold">
              Ayo Segera Daftar !!
            </button>
          </Link>
        </div>
      </div>
      <div className="lg:w-2/5 mt-20 lg:mt-230">
        <img
          src="https://ppid.pta-pontianak.go.id/Animasi/Pedoman%20Keuangan.png"
          alt="Keuangan Illustration"
          className="w-full max-w-lg mx-auto transform scale-150 transition duration-300 -mt-140"
        />
      </div>
    </section>
 
      {/* Semua Section Lain */}
      <About />
      <OurTeam />
      <FAQpage />
      <CustomerReview />
      <Contact />
    </div>
  );
}
