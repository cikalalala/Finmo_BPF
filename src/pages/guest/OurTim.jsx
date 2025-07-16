export default function OurTeam() {
  const teamMembers = [
    {
      name: "M. Rizal Wahyu Hermawan",
      role: "UI/UX Designer",
      image: new URL("../../assets/foto1.png", import.meta.url).href,
    },
    {
      name: "Cikal",
      role: "Back end Developer",
      image: new URL("../../assets/foto2.png", import.meta.url).href,
    },
    {
      name: "Radit",
      role: "Front end Developer",
      image: new URL("../../assets/foto3.png", import.meta.url).href,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold uppercase">TEAM</h2>
        <p className="text-gray-200 mt-2 max-w-xl mx-auto">
          Kami adalah tim berdedikasi yang bekerja sama untuk menciptakan solusi keuangan yang mudah digunakan, aman, dan nyaman bagi mahasiswa.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white text-black w-64 h-80 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
