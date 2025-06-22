import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen text-white px-6 py-16">
      {/* Bagian Judul Tengah */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Kontak</h2>
      </div>

      {/* Konten utama */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* KIRI: Info Kontak */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Hubungi kami</h2>
            <p className="text-gray-300 max-w-md">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.
            </p>
          </div>

          <div className="flex items-start gap-4 bg-[#0c1c2e] p-6 rounded-md border border-yellow-400">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h4 className="text-lg font-bold">Alamat</h4>
              <p>Indonesia, Pekanbaru, Rumbai, 21113</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#0c1c2e] p-6 rounded-md border border-yellow-400">
            <FaEnvelope className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h4 className="text-lg font-bold">Email</h4>
              <p>Finmo@Gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#0c1c2e] p-6 rounded-md border border-yellow-400">
            <FaPhoneAlt className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h4 className="text-lg font-bold">Call Direct</h4>
              <p>+62 8123 3212 3243</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#0c1c2e] p-6 rounded-md border border-yellow-400">
            <FaClock className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h4 className="text-lg font-bold">Jam Kerja</h4>
              <p>Senin - Sabtu : 7 WIT - 9 WIB</p>
            </div>
          </div>
        </div>

        {/* KANAN: Formulir */}
        <div className="flex-1 bg-[#0c1c2e] p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-center mb-2">Kirim Pesan</h3>
          <p className="text-sm text-center text-gray-300 mb-6">
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full p-3 rounded bg-transparent border border-gray-400 text-white focus:outline-none focus:border-yellow-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-transparent border border-gray-400 text-white focus:outline-none focus:border-yellow-400"
            />
            <input
              type="tel"
              placeholder="No HP"
              className="w-full p-3 rounded bg-transparent border border-gray-400 text-white focus:outline-none focus:border-yellow-400"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded bg-transparent border border-gray-400 text-white focus:outline-none focus:border-yellow-400"
            />
            <textarea
              placeholder="Pesan"
              rows="4"
              className="w-full p-3 rounded bg-transparent border border-gray-400 text-white focus:outline-none focus:border-yellow-400"
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 w-full"
            >
              Kirim Pesan <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
