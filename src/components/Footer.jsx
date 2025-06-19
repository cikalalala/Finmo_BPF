export default function Footer() {
  return (
    <div id="sidebar-footer" className="mt-auto pt-6 border-t text-sm text-gray-400">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        {/* Kontak */}
        <div className="text-center md:text-left">
          <p>Email: <a href="mailto:info@sedapresto.com" className="text-purple-600 hover:underline">info@sedapresto.com</a></p>
          <p>Telp: <a href="tel:+62123456789" className="text-purple-600 hover:underline">+62 123 456 789</a></p>
        </div>

        {/* Sosmed */}
        <div className="flex gap-3">
          <a href="https://facebook.com/sedapresto" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-purple-600">📘</a>
          <a href="https://instagram.com/sedapresto" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-purple-600">📸</a>
          <a href="https://twitter.com/sedapresto" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-purple-600">🐦</a>
        </div>

        {/* Gambar kecil */}
        <img
          src="https://via.placeholder.com/50x30?text=👨‍🍳"
          alt="Logo orang"
          className="object-contain"
        />
      </div>

      <div className="mt-4 text-center text-xs">
        <span className="block font-bold">Sedap Restaurant Admin Dashboard</span>
        <p className="font-light">&copy; 2025 All Rights Reserved</p>
      </div>
    </div>
  );
}
