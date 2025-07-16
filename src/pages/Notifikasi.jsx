import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { supabase } from "../assets/supabaseClient";

export default function Notifikasi() {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const channel = supabase.channel("realtime-notif");

    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "pemasukan" },
        (payload) => {
          setMessages((prev) => [
            {
              type: "income",
              text: `Pemasukan sebesar Rp ${Number(payload.new.jumlah).toLocaleString("id-ID")} berhasil ditambahkan.`,
              time: new Date(),
            },
            ...prev,
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "pengeluaran" },
        (payload) => {
          setMessages((prev) => [
            {
              type: "expense",
              text: `Pengeluaran sebesar Rp ${Number(payload.new.jumlah).toLocaleString("id-ID")} telah dicatat.`,
              time: new Date(),
            },
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fungsi waktu relatif
  const timeAgo = (time) => {
    const diff = Math.floor((new Date() - time) / 1000);
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return time.toLocaleString("id-ID");
  };

  return (
    <div className="relative">
      <button onClick={() => setShow(!show)} className="relative">
        <FaBell className="text-white text-lg cursor-pointer" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {messages.length}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 top-10 bg-white text-black shadow-lg rounded-md w-72 z-50 max-h-96 overflow-y-auto border border-gray-200">
          {messages.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Tidak ada notifikasi
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {messages.map((notif, idx) => (
                <li
                  key={idx}
                  className={`p-4 text-sm hover:bg-gray-50 transition flex flex-col ${
                    notif.type === "income"
                      ? "border-l-4 border-green-400"
                      : "border-l-4 border-red-400"
                  }`}
                >
                  <span className="font-medium text-gray-800">{notif.text}</span>
                  <span className="text-xs text-gray-400 mt-1">{timeAgo(notif.time)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
