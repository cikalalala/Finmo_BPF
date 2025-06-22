

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 max-w-7xl mx-auto">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold">
          Atur <span className="text-green-500">Keuanganmu</span>, Capai Impianmu
        </h1>
        <p className="text-white/90 text-lg leading-relaxed max-w-md">
          Website manajemen keuangan yang dirancang khusus untuk mahasiswa. Catat pengeluaran, kelola pemasukan,
          dan capai target tabungan dengan mudah dan teratur.
        </p>
        <div className="flex space-x-4">
          <button className="btn btn-warning font-semibold">Ayo Segera Daftar !!</button>
          <button className="btn btn-outline text-white border-white">Services</button>
        </div>
      </div>
      <div className="lg:w-2/5 mt-20 lg:mt-50">
        <img
          src="https://ppid.pta-pontianak.go.id/Animasi/Pedoman%20Keuangan.png"
          alt="Keuangan Illustration"
          className="w-full max-w-lg mx-auto transform scale-160 transition duration-300"
        />
      </div>
    </section>
  );
}
