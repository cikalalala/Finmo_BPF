import { Link } from "react-router-dom";
import About from "../pages/Guest/About";
import OurTeam from "../pages/guest/OurTim";
import FAQpage from "../pages/guest/FAQpage";
import Contact from "../pages/guest/Contact";
import CustomerReview from "../pages/guest/CustomerReview";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-[#6170f0] to-[#359e4c] text-white overflow-hidden">
      {/* Decorative Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-white/10 rounded-full top-10 left-10 animate-ping-slow"></div>
        <div className="absolute w-32 h-32 bg-yellow-300/20 rounded-lg bottom-20 right-16 animate-float"></div>
        <div className="absolute w-24 h-24 bg-green-400/20 rounded-full top-1/3 right-1/4 animate-bounce-slow"></div>
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-24 relative z-10">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 animate-fade-in">

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Kelola <span className="text-green-300">Keuanganmu</span> Lebih Mudah & Terstruktur!
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-md">
            Aplikasi Finmo hadir untuk memudahkan mahasiswa mengelola keuangan harian, mencatat pemasukan, pengeluaran, hingga mengontrol anggaran tanpa ribet.
          </p>
          <p className="text-white/80 text-base max-w-md">
            Dapatkan laporan keuangan otomatis, tips hemat ala mahasiswa, dan nikmati berbagai fitur premium gratis tanpa batasan waktu!
          </p>
          <div className="flex space-x-4">
            <Link to="/register">
              <button className="px-6 py-3 rounded-full bg-yellow-300 text-black font-bold hover:scale-105 transition">
                Daftar Gratis Sekarang 🚀
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-2/5 relative flex justify-center mt-12 lg:mt-0 animate-float">
          <img
            src="https://ppid.pta-pontianak.go.id/Animasi/Pedoman%20Keuangan.png"
            alt="Keuangan Illustration"
            className="w-full max-w-[700px]"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/276/276020.png"
            className="absolute top-0 left-0 w-12 animate-bounce-slow"
            alt="icon1"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/10384/10384161.png"
            className="absolute bottom-0 right-0 w-14 animate-pulse-slow"
            alt="icon2"
          />
        </div>
      </section>

      {/* SVG Background Curve */}


      {/* Section Lain */}
      <section className="pt-10">
      <About />
      <OurTeam />
      <FAQpage />
      <CustomerReview />
      <Contact />
      </section>
    </div>
  );
}

