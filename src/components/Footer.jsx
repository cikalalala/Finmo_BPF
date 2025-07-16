import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4 md:px-20 text-gray-800 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        
        {/* Logo & Deskripsi */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-gray-900">Finmo</span>
          </div>
          <p className="text-sm text-gray-500">
            Website manajemen keuangan khusus untuk mahasiswa, bantu atur pengeluaran dengan mudah.
          </p>
          <div className="flex gap-3 pt-4">
            <Link to="/register">
              <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-semibold">Get Start</button>
            </Link>
          </div>
        </div>

        {/* Menu Pages */}
        <div className="flex gap-10">
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li><Link to="/About" className="hover:text-green-600">About Us</Link></li>
              <li><Link to="/Contact" className="hover:text-green-600">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Utility Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/Contact" className="hover:text-green-600">Contact</Link></li>
              <li><Link to="/OurTim" className="hover:text-green-600">Our Team</Link></li>
              <li><Link to="/FAQpage" className="hover:text-green-600">FAQ</Link></li>
              <li><Link to="/CustomerRivew" className="hover:text-green-600">Customer Review</Link></li>
            </ul>
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-xs">
          <h3 className="text-purple-600 font-bold text-sm">Address</h3>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready To Get Started?</h2>
          <p className="text-sm text-gray-500 mb-4">Website mahasiswa, lebih mudah kelola keuanganmu.</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>📧 finmo@gmail.com</p>
            <p>📞 +62 812-3456-7890</p>
            <p>📞 +62 812-5555-7777</p>
          </div>
        </div>
      </div>

      {/* Garis Bawah */}
      <div className="border-t border-gray-300 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2025 Finmo. All Rights Reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}
