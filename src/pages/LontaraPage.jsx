// src/pages/LontaraPage.jsx
import LontaraConverter from '../components/LontaraConverter';

const LontaraPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-bugis-marun mb-2 text-center">
        ✒️ Konversi Aksara Lontara ↔ Latin
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Ubah teks Latin menjadi aksara Lontara, atau sebaliknya — pelestarian budaya digital.
      </p>
      <LontaraConverter />
    </div>
  );
};

export default LontaraPage;