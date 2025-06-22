import { useState } from "react";

export default function FAQpage() {
  const faqData = [
    {
      question: "Apa itu Finmo?",
      answer:
        "Finmo adalah aplikasi pengelolaan keuangan pribadi yang membantu pengguna mencatat pemasukan, pengeluaran, membuat anggaran, serta melihat laporan keuangan secara mudah dan efisien.",
    },
    {
      question: "Apakah saya perlu mendaftar untuk menggunakan Finmo?",
      answer:
        "Ya, untuk dapat menggunakan semua fitur Finmo seperti Dashboard, Laporan Keuangan, dan Notifikasi, Anda perlu membuat akun terlebih dahulu melalui halaman Register.",
    },
    {
      question: "Apa saja fitur utama yang tersedia di Finmo?",
      answer:
        "Finmo menyediakan fitur pencatatan pemasukan dan pengeluaran, perencanaan anggaran (budgeting), laporan keuangan bulanan, notifikasi pengingat, dan manajemen akun pengguna.",
    },
    {
      question: "Apakah data keuangan saya aman di Finmo?",
      answer:
        "Tentu! Finmo menggunakan standar keamanan modern untuk menjaga kerahasiaan dan integritas data pengguna.",
    },
    {
      question: "Apakah Finmo bisa digunakan di perangkat mobile?",
      answer:
        "Saat ini Finmo dirancang untuk tampilan web, namun dapat diakses melalui browser di perangkat mobile dan akan otomatis menyesuaikan tampilannya secara responsif.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Bagian Kiri */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-yellow-500 bg-[#0c1c2e] rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left font-semibold text-white"
                >
                  {item.question}
                </button>
                {activeIndex === index && (
                  <p className="mt-2 text-white text-sm">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="flex-1">
          <img
            src="/Gambar/imgFAQ.png"
            alt="FAQ Illustration"
            className="w-40 sm:w-56 md:w-72 lg:w-80 xl:w-500 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
