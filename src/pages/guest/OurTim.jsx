export default function OurTeam() {
  const teamMembers = [
    {
      name: "M. Rizal Wahyu Hermawan",
      role: "UI/UX Designer",
      image: new URL("/Gambar/Rizal.jpg", import.meta.url).href,
    },
    {
      name: "Cikal Nur Adhani Dharma",
      role: "Back End Developer",
      image: new URL("/Gambar/cikal.png", import.meta.url).href,
    },
    {
      name: "Radit",
      role: "Front End Developer",
      image: new URL("../../assets/foto3.png", import.meta.url).href,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#359e4c] to-[#6170f0] text-white">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-bold uppercase">Tim Finmo</h2>
        <p className="text-white/90 max-w-3xl mx-auto text-lg">
          Kami adalah tim mahasiswa berpengalaman yang memiliki misi membuat pengelolaan keuangan lebih mudah, sederhana, dan nyaman untuk para mahasiswa. Kolaborasi kami berfokus pada desain intuitif, fitur lengkap, dan keamanan data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 space-y-3 text-center">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-green-600 font-semibold">{member.role}</p>
              <p className="text-gray-700 text-sm">{member.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
