import React from 'react';

export default function About() {
  return (
    <section >
      <div className="max-w-7xl mx-auto text-center space-y-10">

        {/* Judul dan Deskripsi */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Tentang Kami</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Website manajemen keuangan yang membantu mahasiswa mengelola pemasukan, pengeluaran,
            dan tabungan secara bijak dan terstruktur.
          </p>
        </div>

        {/* Avatar Tim */}
        <div className="flex justify-center gap-8 flex-wrap">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" alt="Team 1" className="w-40 h-40 rounded-full" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s" alt="Team 2" className="w-40 h-40 rounded-full" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s" alt="Team 3" className="w-40 h-40 rounded-full" />
        </div>

        {/* Siapa Kami */}
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-semibold">Siapa Kami?</h3>
          <p className="text-white/80 text-base max-w-3xl mx-auto leading-relaxed">
            Kami adalah tim pengembang muda yang memahami tantangan mahasiswa dalam mengelola uang bulanan.
            Dengan latar belakang sebagai mahasiswa juga, kami ingin menciptakan platform yang mudah digunakan,
            bermanfaat, dan benar-benar menjawab kebutuhan keuangan harian mahasiswa.
          </p>
        </div>

        {/* Misi dan Visi */}
        <div className="flex flex-col lg:flex-row justify-between items-start mt-16 gap-8">
          <div className="bg-[#175c3e]/60 p-6 rounded-md w-full lg:w-1/2">
            <h4 className="font-semibold text-white mb-2">Misi Kami</h4>
            <p className="text-white/80 leading-relaxed">
              Membantu mahasiswa lebih disiplin dalam mengelola keuangan pribadi dan membangun kebiasaan finansial yang sehat.
            </p>
          </div>
          <div className="bg-[#175c3e]/60 p-6 rounded-md w-full lg:w-1/2">
            <h4 className="font-semibold text-white mb-2">Visi Kami</h4>
            <p className="text-white/80 leading-relaxed">
              Menjadi platform manajemen keuangan pilihan utama mahasiswa di seluruh Indonesia.
            </p>
          </div>
        </div>

        {/* Ilustrasi */}
        <div className="mt-10 flex justify-end">
          <img
            src="/Gambar/ImgAbout.png"
            alt="Ilustrasi Finansial"
            className="w-72"
          />
        </div>
      </div>
    </section>
  );
}
