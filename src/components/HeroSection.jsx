
export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 max-w-7xl mx-auto">
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold">
          Atur <span className="text-green-500">Keuanganmu</span>, Capai Impianmu
        </h1>
        <p className="text-white/90">
          Website manajemen keuangan yang dirancang khusus untuk mahasiswa. Catat pengeluaran, kelola pemasukan,
          dan capai target tabungan dengan mudah dan teratur.
        </p>
        <div className="flex space-x-4">
          <button className="btn btn-warning font-semibold">Ayo Segera Daftar !!</button>
          <button className="btn btn-outline text-white border-white">Services</button>
        </div>
      </div>
      <div className="lg:w-1/2 mt-10 lg:mt-0">
        <img
          src="https://png.pngtree.com/png-clipart/20190905/original/pngtree-flat-wind-h5-financial-bank-financial-stock-market-png-image_4520625.jpg"
          alt="Keuangan Illustration"
          className="w-full max-w-lg mx-auto"
        />
      </div>
    </section>
  );
}
