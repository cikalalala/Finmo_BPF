import { useState } from "react";

export default function CustomerReview() {
  const reviews = [
    { name: "Aldo Pratama", message: "Aplikasi ini sangat membantu saya dalam mengatur keuangan bulanan.", photo: "https://i.pinimg.com/736x/82/e2/0e/82e20ea1967842c1c9148c829f8958cc.jpg" },
    { name: "Bella Anggraini", message: "User interface-nya ramah banget. Gampang dipakai!", photo: "https://i.pinimg.com/736x/00/a8/b1/00a8b13df1da6baa85942271d36ef88c.jpg" },
    { name: "Candra Wijaya", message: "Fitur budgeting-nya keren. Saya jadi lebih disiplin dalam pengeluaran.", photo: "https://i.pinimg.com/1200x/a1/8a/10/a18a106fbc97ff3acaf1463287a29985.jpg" },
    { name: "Diana Kusuma", message: "Rekomendasi banget untuk tracking pengeluaran harian.", photo: "https://i.pinimg.com/736x/62/47/80/624780fe84a031fe5076225d5c448a91.jpg" },
    { name: "Eko Ramadhan", message: "Simple tapi powerful. Cocok untuk mahasiswa kayak saya.", photo: "https://i.pinimg.com/1200x/08/08/45/0808451bc6ef6ff426bb39880f956551.jpg" },
    { name: "Fiona Amalia", message: "Dari sekian banyak aplikasi keuangan, ini paling cocok buat saya.", photo: "https://i.pinimg.com/736x/66/06/d5/6606d5524f2b1025f9fd402281ae5a69.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-[#359e4c] to-[#6170f0] text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Customer Review</h2>

      {/* SLIDER */}
      <div className="max-w-4xl mx-auto relative bg-white text-black rounded-xl shadow-lg p-8 mb-14 transition-all duration-500 ease-in-out transform hover:scale-[1.02]">
        <img
          src={reviews[currentIndex].photo}
          alt={reviews[currentIndex].name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover transition duration-300 hover:scale-110"
        />
        <p className="italic text-center text-gray-800 mb-4 transition-opacity duration-500 opacity-100">
          "{reviews[currentIndex].message}"
        </p>
        <h4 className="font-semibold text-lg text-center">{reviews[currentIndex].name}</h4>

        <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
          <button
            onClick={prevSlide}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:scale-110 transition"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:scale-110 transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* SEMUA REVIEW */}
      <h3 className="text-2xl font-bold mb-6 text-center">Semua Review Mahasiswa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={review.photo} alt={review.name} className="w-14 h-14 rounded-full object-cover" />
              <h4 className="font-semibold">{review.name}</h4>
            </div>
            <p className="text-gray-800 text-sm italic">"{review.message}"</p>
          </div>
        ))}
      </div>

      {/* STATISTIK */}
      <div className="bg-white rounded-xl p-10 max-w-6xl mx-auto text-black grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
        <div className="text-center space-y-2 hover:scale-105 transition-transform duration-300">
          <h3 className="text-4xl font-bold text-yellow-500">4.9/5</h3>
          <p className="font-medium text-gray-800">Rating Pengguna</p>
        </div>
        <div className="text-center space-y-2 hover:scale-105 transition-transform duration-300">
          <h3 className="text-4xl font-bold text-yellow-500">1200+</h3>
          <p className="font-medium text-gray-800">Mahasiswa Bergabung</p>
        </div>
        <div className="text-center space-y-2 hover:scale-105 transition-transform duration-300">
          <h3 className="text-4xl font-bold text-yellow-500">98%</h3>
          <p className="font-medium text-gray-800">Kepuasan Pengguna</p>
        </div>
      </div>
    </div>
  );
}
