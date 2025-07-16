import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#1F3A7E] to-[#26A136] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT SIDE */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 bg-gradient-to-br from-blue-700 to-green-500 text-white flex flex-col justify-center items-center p-8"
        >
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-center drop-shadow-md">
            Welcome to <span className="text-green-200">Finmo</span>
          </h1>

          <p className="text-center text-base opacity-90 max-w-md mb-6">
            Track your expenses, budget smartly, and control your financial future.
          </p>

          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-white text-green-700 rounded-lg shadow-md hover:bg-gray-100 transition-all text-sm"
          >
            Back
          </button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex flex-col justify-center p-8 relative"
        >
          <Outlet />
          <p className="text-center text-xs text-gray-400 mt-10">
            © 2025 Finmo Dashboard. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
