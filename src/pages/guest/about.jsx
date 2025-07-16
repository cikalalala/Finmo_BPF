import { FaCheckCircle, FaWallet, FaChartPie, FaBell, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-[#6170f0] to-[#359e4c] text-white min-h-screen flex items-center px-8 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Bagian Kiri */}
        <div className="space-y-8">
          {/* Tentang Finmo */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4">
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">Tentang Finmo 🚀</span>
            <h2 className="text-4xl font-bold leading-tight">Platform Keuangan untuk Mahasiswa Modern</h2>
            <p className="text-white/90 leading-relaxed">
              Finmo adalah solusi pengelolaan keuangan pribadi yang dirancang khusus untuk mahasiswa. 
              Dengan Finmo, kamu dapat lebih mudah mengontrol arus keuangan, merencanakan tabungan, serta 
              mendapatkan laporan keuangan secara otomatis. Tidak perlu ribet dengan catatan manual, semua terorganisir dalam satu platform.
            </p>
          </div>

          {/* Fitur Finmo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 p-5 rounded-xl shadow-md hover:scale-105 transition space-y-2">
              <FaWallet className="text-green-300 text-3xl" />
              <h3 className="font-bold text-lg">Pencatatan Keuangan</h3>
              <p className="text-white/80 text-sm">
                Catat setiap pemasukan maupun pengeluaran secara cepat dengan antarmuka yang simpel dan praktis.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl shadow-md hover:scale-105 transition space-y-2">
              <FaChartPie className="text-green-300 text-3xl" />
              <h3 className="font-bold text-lg">Anggaran Bulanan</h3>
              <p className="text-white/80 text-sm">
                Tentukan batas pengeluaran bulanan untuk membantu kamu tetap disiplin dalam pengelolaan uang saku.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl shadow-md hover:scale-105 transition space-y-2">
              <FaBell className="text-green-300 text-3xl" />
              <h3 className="font-bold text-lg">Notifikasi Pengingat</h3>
              <p className="text-white/80 text-sm">
                Terima pengingat otomatis tentang anggaran dan pengeluaran mingguan agar lebih terkontrol.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl shadow-md hover:scale-105 transition space-y-2">
              <FaLightbulb className="text-green-300 text-3xl" />
              <h3 className="font-bold text-lg">Tips Hemat Mahasiswa</h3>
              <p className="text-white/80 text-sm">
                Dapatkan tips-tips hemat serta ide pengelolaan uang dari para ahli keuangan khusus untuk mahasiswa.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="relative flex flex-col items-center">
          <div className="relative -mt-12">
            <img
              src="/Gambar/ImgAbout.png"
              alt="Ilustrasi Finmo"
              className="w-[400px] rounded-2xl animate-float"
            />
          </div>

          {/* Visi Misi */}
          <div className="mt-8 w-full flex flex-col gap-4">
            <div className="bg-white/10 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-yellow-300 mb-2">Visi Kami 🎯</h3>
              <p className="text-white/80 text-sm">
                Menjadi partner keuangan terpercaya mahasiswa Indonesia dengan layanan pengelolaan finansial yang inovatif, modern, dan mudah digunakan.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl text-center shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-yellow-300 mb-2">Misi Kami 🌟</h3>
              <p className="text-white/80 text-sm">
                Menciptakan budaya finansial yang sehat bagi mahasiswa dengan memberikan tools edukasi keuangan praktis, pengingat keuangan rutin, dan fitur analisa pengeluaran otomatis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
