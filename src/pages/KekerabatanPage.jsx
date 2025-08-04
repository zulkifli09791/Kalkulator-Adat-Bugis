// src/pages/KekerabatanPage.jsx
import Kekerabatan from '../components/Kekerabatan';

const KekerabatanPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-bugis-marun mb-2 text-center">
        🧬 Cek Hubungan Kekerabatan
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Cek apakah dua calon mempelai memiliki hubungan keluarga menurut adat Bugis.
      </p>
      <Kekerabatan />
    </div>
  );
};

export default KekerabatanPage;