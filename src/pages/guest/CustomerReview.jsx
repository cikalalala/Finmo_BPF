export default function CustomerReview() {
  const reviews = [
    {
      name: "Aldo Pratama",
      message: "Aplikasi ini sangat membantu saya dalam mengatur keuangan bulanan.",
      photo: "/Gambar/profile1.png",
    },
    {
      name: "Bella Anggraini",
      message: "User interface-nya ramah banget. Gampang dipakai!",
      photo: "/Gambar/profile2.png",
    },
    {
      name: "Candra Wijaya",
      message: "Fitur budgeting-nya keren. Saya jadi lebih disiplin dalam pengeluaran.",
      photo: "/Gambar/profile3.png",
    },
    {
      name: "Diana Kusuma",
      message: "Rekomendasi banget untuk yang ingin tracking pengeluaran harian.",
      photo: "/Gambar/profile4.png",
    },
    {
      name: "Eko Ramadhan",
      message: "Simple tapi powerful. Cocok untuk mahasiswa kayak saya.",
      photo: "/Gambar/profile5.png",
    },
    {
      name: "Fiona Amalia",
      message: "Dari sekian banyak aplikasi keuangan, ini yang paling cocok buat saya.",
      photo: "/Gambar/profile6.png",
    },
  ];

  return (
    <div className="min-h-screen  text-white px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Customer Review</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <img
              src={review.photo}
              alt={review.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <p className="text-sm italic text-gray-700 mb-4">"{review.message}"</p>
            <h4 className="font-semibold text-sm">- {review.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
