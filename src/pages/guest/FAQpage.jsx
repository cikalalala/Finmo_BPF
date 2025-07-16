import { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQpage() {
  const faqData = [
    {
      question: "Apa itu Finmo?",
      answer: "Finmo adalah aplikasi pengelolaan keuangan pribadi yang membantu pengguna mencatat pemasukan, pengeluaran, membuat anggaran, serta melihat laporan keuangan secara mudah dan efisien.",
    },
    {
      question: "Apakah saya perlu mendaftar untuk menggunakan Finmo?",
      answer: "Ya, untuk dapat menggunakan semua fitur Finmo seperti Dashboard, Laporan Keuangan, dan Notifikasi, Anda perlu membuat akun terlebih dahulu.",
    },
    {
      question: "Apa saja fitur utama yang tersedia di Finmo?",
      answer: "Finmo menyediakan fitur pencatatan pemasukan dan pengeluaran, perencanaan anggaran, laporan keuangan bulanan, notifikasi pengingat, dan manajemen akun pengguna.",
    },
    {
      question: "Apakah data saya aman di Finmo?",
      answer: "Finmo menggunakan standar keamanan modern untuk menjaga kerahasiaan dan integritas data pengguna.",
    },
    {
      question: "Apakah Finmo tersedia di mobile?",
      answer: "Finmo dapat diakses melalui browser di perangkat mobile dengan tampilan responsif yang optimal.",
    },
    {
      question: "Apakah Finmo gratis digunakan?",
      answer: "Finmo dapat digunakan secara gratis tanpa batasan fitur utama. Beberapa fitur premium tersedia untuk pengembangan lanjutan.",
    },
    {
      question: "Bagaimana cara mengatur anggaran bulanan di Finmo?",
      answer: "Kamu bisa masuk ke dashboard, pilih fitur 'Budget', tentukan batas pengeluaran, dan Finmo akan membantu mengingatkan kamu secara otomatis.",
    },
    {
      question: "Apakah Finmo cocok untuk mahasiswa?",
      answer: "Sangat cocok! Finmo memang didesain khusus untuk membantu mahasiswa mengatur keuangan secara praktis dan tidak ribet.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-32 bg-gradient-to-b from-[#6170f0] to-[#359e4c] text-white">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Pertanyaan Umum</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan paling umum tentang bagaimana Finmo membantu mengatur keuanganmu secara lebih efektif.
          </p>
        </div>

        {/* FAQ List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer ${activeIndex === index ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-yellow-300 text-xl" />
                  <h3 className="text-xl font-semibold">{item.question}</h3>
                </div>
                {activeIndex === index ? (
                  <FaChevronUp className="text-yellow-300" />
                ) : (
                  <FaChevronDown className="text-yellow-300" />
                )}
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-white/80 text-base">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
