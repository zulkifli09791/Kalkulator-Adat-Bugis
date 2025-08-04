import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center max-w-5xl mx-auto mt-8 px-4">
      {/* Hero dengan Background Rumah Adat */}
      <div
        className="h-80 bg-center bg-cover rounded-2xl shadow-2xl mb-10 flex items-center justify-center text-white font-adat relative"
        style={{ backgroundImage: "url('/assets/images/rumahpanggung.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
        <h1 className="text-5xl md:text-6xl font-bold z-10 drop-shadow-2xl">
          Kalkulator Adat Bugis
        </h1>
      </div>

      <h1 className="text-4xl font-bold text-bugis-marun mb-6 font-adat">
        Selamat Datang di Kalkulator Adat Bugis
      </h1>
      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        Temukan makna budaya Bugis melalui kalkulator adat: uang panai’, hari baik pernikahan, 
        hubungan kekerabatan, dan konversi aksara Lontara.
      </p>

      {/* Fitur Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {[
          { path: '/panai', title: '💰 Kalkulator Panai’', desc: 'Hitung sesuai adat Bugis' },
          { path: '/haribai', title: '📅 Hari Baik', desc: 'Tentukan hari pernikahan' },
          { path: '/kekerabatan', title: '🧬 Cek Kekerabatan', desc: 'Cek hubungan keluarga' },
          { path: '/lontara', title: '✒️ Konversi Lontara', desc: 'Tulisan tradisional Bugis' },
        ].map((item, i) => (
          <Link key={i} to={item.path} className="card hover:border-bugis-marun group">
            <h3 className="text-2xl font-bold group-hover:text-bugis-marun transition">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;