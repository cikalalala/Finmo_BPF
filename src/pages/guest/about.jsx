import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-[#6170f0] to-[#359e4c] text-white min-h-screen flex items-center px-8 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Ilustrasi dan Icon Dekorasi */}
        <div className="relative flex justify-center animate-fade-in-up">
          <img
            src="/Gambar/ImgAbout.png"
            alt="Tentang Kami"
            className="w-[380px] rounded-2xl z-10 relative"
          />
          {/* Icon Dekorasi */}
          <div className="absolute top-0 left-0 animate-pulse-slow">
            <img src="https://cdn-icons-png.flaticon.com/512/276/276020.png" alt="icon" className="w-10" />
          </div>
          <div className="absolute bottom-10 left-0 animate-bounce">
            <img src="https://cdn-icons-png.flaticon.com/512/10384/10384161.png" alt="icon" className="w-12" />
          </div>
          <div className="absolute top-10 right-0 animate-float">
            <img src="https://cdn-icons-png.flaticon.com/512/6475/6475944.png" alt="icon" className="w-14" />
          </div>
        </div>

        {/* Text dan Fitur */}
        <div className="space-y-6">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
            Tentang Finmo 🚀
          </span>
          <h2 className="text-5xl font-bold leading-tight tracking-wide">
            Kelola Keuangan Mahasiswa <span className="text-yellow-400">Lebih Mudah</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Finmo hadir untuk membantumu mencatat pemasukan, pengeluaran, dan membuat anggaran keuangan
            yang lebih disiplin dan terarah. Cocok banget untuk mahasiswa yang ingin mengontrol keuangan dengan baik.
          </p>
          <div className="space-y-4 text-base text-white">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400 text-xl" />
              Catatan keuangan harian mudah & cepat
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400 text-xl" />
              Rencana anggaran bulanan terkontrol
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400 text-xl" />
              Grafik pengeluaran otomatis & akurat
            </div>
          </div>
          <button className="mt-8 px-8 py-3 rounded-full bg-yellow-400 text-black text-lg font-bold hover:scale-105 transition">
            Coba Finmo Sekarang!
          </button>
        </div>

      </div>
    </section>
  );
}
