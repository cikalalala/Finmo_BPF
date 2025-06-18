import { FaMoneyBillWave, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
           

            <div
                id="dashboard-grid"
                className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
                {/* Saldo Akhir */}
                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
                    <div className="bg-green-100 text-green-600 rounded-full p-4 text-xl">
                        <FaWallet />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp 1.300.000</span>
                        <span className="text-gray-500 text-sm">Saldo Akhir</span>
                    </div>
                </div>

                {/* Total Pemasukan */}
                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4 text-xl">
                        <FaArrowDown />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp 2.500.000</span>
                        <span className="text-gray-500 text-sm">Total Pemasukan</span>
                    </div>
                </div>

                {/* Total Pengeluaran */}
                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
                    <div className="bg-red-100 text-red-500 rounded-full p-4 text-xl">
                        <FaArrowUp />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp 1.200.000</span>
                        <span className="text-gray-500 text-sm">Total Pengeluaran</span>
                    </div>
                </div>

                {/* Total Transaksi */}
                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-md p-4">
                    <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 text-xl">
                        <FaMoneyBillWave />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">35 Transaksi</span>
                        <span className="text-gray-500 text-sm">Total Transaksi</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
