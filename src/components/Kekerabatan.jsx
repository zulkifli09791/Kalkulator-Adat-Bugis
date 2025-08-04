import { useState } from 'react';

const Kekerabatan = () => {
  const [orang1, setOrang1] = useState({
    nama: '',
    ayah: '',
    ibu: '',
    kakek: '',
    nenek: '',
  });

  const [orang2, setOrang2] = useState({
    nama: '',
    ayah: '',
    ibu: '',
    kakek: '',
    nenek: '',
  });

  const [hasil, setHasil] = useState(null);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const cekKekerabatan = () => {
    const { nama: nama1, ayah: a1, ibu: i1, kakek: k1, nenek: n1 } = orang1;
    const { nama: nama2, ayah: a2, ibu: i2, kakek: k2, nenek: n2 } = orang2;

    if (!a1 || !i1 || !a2 || !i2) {
      setHasil({ error: 'Mohon isi nama orang tua kedua pihak.' });
      return;
    }

    let hubungan = "Tidak memiliki hubungan kekerabatan langsung";
    let derajat = 0;
    let alasan = "";

    // 1. Saudara kandung
    if (a1 === a2 && i1 === i2) {
      hubungan = "Saudara Kandung";
      derajat = 0;
      alasan = `${nama1} dan ${nama2} memiliki ayah dan ibu yang sama. Dalam adat Bugis, pernikahan antar saudara kandung dilarang keras (patturi).`;
    }
    // 2. Saudara tiri (ayah sama, ibu beda)
    else if (a1 === a2 && i1 !== i2) {
      hubungan = "Saudara Tiri (ayah sama)";
      derajat = 1;
      alasan = `${nama1} dan ${nama2} memiliki ayah yang sama tetapi ibu berbeda. Dalam adat Bugis, hubungan ini masih dianggap dekat dan pernikahan umumnya tidak dianjurkan.`;
    }
    // 3. Saudara tiri (ibu sama, ayah beda)
    else if (i1 === i2 && a1 !== a2) {
      hubungan = "Saudara Tiri (ibu sama)";
      derajat = 1;
      alasan = `${nama1} dan ${nama2} memiliki ibu yang sama tetapi ayah berbeda. Hubungan ini juga dianggap dekat dalam struktur keluarga adat.`;
    }
    // 4. Sepupu (kakek/nenek sama)
    else if (k1 === k2 && n1 === n2) {
      hubungan = "Sepupu Pertama";
      derajat = 2;
      alasan = `${nama1} dan ${nama2} memiliki kakek dan nenek yang sama. Dalam adat Bugis, pernikahan antar sepupu pertama umumnya dilarang karena dianggap masih terlalu dekat hubungannya.`;
    }
    // 5. Sepupu (kakek sama, nenek beda) atau sebaliknya
    else if (k1 === k2 || n1 === n2) {
      hubungan = "Sepupu Kedua";
      derajat = 3;
      alasan = `${nama1} dan ${nama2} memiliki satu dari kakek atau nenek yang sama. Dalam beberapa daerah Bugis, pernikahan ini masih bisa dipertimbangkan dengan syarat adat tertentu.`;
    }
    // 6. Anak dari paman/bibi
    else if (a1 === a2 || a1 === i2 || i1 === a2 || i1 === i2) {
      hubungan = "Anak Paman/Bibi";
      derajat = 2;
      alasan = `${nama1} adalah anak dari paman/bibi ${nama2}. Dalam adat Bugis, hubungan ini dianggap dekat dan pernikahan umumnya tidak dianjurkan.`;
    }
    // 7. Keluarga jauh (ayah/ibu dari orang tua sama)
    else if (k1 === a2 || k1 === i2 || k2 === a1 || k2 === i1) {
      hubungan = "Keluarga Jauh (cucu dari kakek yang sama)";
      derajat = 4;
      alasan = `${nama1} dan ${nama2} memiliki hubungan keluarga melalui kakek, tetapi tidak langsung. Dalam adat Bugis, hubungan ini dianggap cukup jauh dan bisa dipertimbangkan untuk pernikahan, dengan persetujuan tetua adat.`;
    }
    // 8. Tidak ada hubungan
    else {
      hubungan = "Tidak memiliki hubungan kekerabatan langsung";
      derajat = 0;
      alasan = `${nama1} dan ${nama2} tidak memiliki hubungan kekerabatan langsung berdasarkan data yang diberikan. Dalam adat Bugis, pasangan tanpa hubungan kekerabatan dekat lebih dianjurkan untuk menikah.`;
    }

    // Status pernikahan menurut adat
    let statusNikah = "✅ Bisa menikah menurut adat";
    if (derajat <= 2) {
      statusNikah = "❌ Tidak dianjurkan menikah menurut adat Bugis";
    } else if (derajat === 3) {
      statusNikah = "⚠️ Bisa dipertimbangkan dengan syarat adat";
    }

    setHasil({
      hubungan,
      derajat,
      alasan,
      statusNikah,
    });
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-bugis-marun mb-6 font-adat">🧬 Cek Kekerabatan Keluarga (Adat Bugis)</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Masukkan data keluarga kedua calon mempelai untuk mengecek hubungan kekerabatan menurut adat Bugis. 
        Pernikahan antar keluarga dekat (<i>patturi</i>) dilarang dalam tradisi Bugis.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Orang 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-bugis-marun">Data {orang1.nama || 'Orang 1'}</h3>
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={orang1.nama}
            onChange={handleChange(setOrang1)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="ayah"
            placeholder="Nama Ayah"
            value={orang1.ayah}
            onChange={handleChange(setOrang1)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="ibu"
            placeholder="Nama Ibu"
            value={orang1.ibu}
            onChange={handleChange(setOrang1)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="kakek"
            placeholder="Nama Kakek"
            value={orang1.kakek}
            onChange={handleChange(setOrang1)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="nenek"
            placeholder="Nama Nenek"
            value={orang1.nenek}
            onChange={handleChange(setOrang1)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>

        {/* Orang 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-bugis-marun">Data {orang2.nama || 'Orang 2'}</h3>
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={orang2.nama}
            onChange={handleChange(setOrang2)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="ayah"
            placeholder="Nama Ayah"
            value={orang2.ayah}
            onChange={handleChange(setOrang2)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="ibu"
            placeholder="Nama Ibu"
            value={orang2.ibu}
            onChange={handleChange(setOrang2)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="kakek"
            placeholder="Nama Kakek"
            value={orang2.kakek}
            onChange={handleChange(setOrang2)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
          <input
            type="text"
            name="nenek"
            placeholder="Nama Nenek"
            value={orang2.nenek}
            onChange={handleChange(setOrang2)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>
      </div>

      <button
        onClick={cekKekerabatan}
        className="btn-emas w-full py-3 text-lg hover:scale-105 transition"
      >
        🔍 Cek Hubungan Kekerabatan
      </button>

      {hasil && (
        <div className="mt-8 p-6 bg-white border-l-4 border-bugis-emas rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-bugis-marun">Hasil Pengecekan</h3>

          <div className="mt-4 space-y-3">
            <p><strong>Hubungan:</strong> <span className="text-bugis-emas font-semibold">{hasil.hubungan}</span></p>
            <p><strong>Derajat Kekerabatan:</strong> {hasil.derajat}</p>
            <p><strong>Status Pernikahan:</strong> <span className={hasil.statusNikah.includes('✅') ? 'text-green-600' : hasil.statusNikah.includes('⚠️') ? 'text-yellow-600' : 'text-red-600'}>{hasil.statusNikah}</span></p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-bugis-marun">Alasan Budaya:</h4>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">{hasil.alasan}</p>
          </div>
        </div>
      )}

      {hasil?.error && (
        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded">
          <p>{hasil.error}</p>
        </div>
      )}
    </div>
  );
};

export default Kekerabatan;