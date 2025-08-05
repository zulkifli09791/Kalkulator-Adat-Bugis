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
    const p1 = { ...orang1 };
    const p2 = { ...orang2 };

    if (!p1.nama || !p2.nama) {
      setHasil({ error: 'Mohon isi nama kedua pihak.' });
      return;
    }

    if (!p1.ayah || !p1.ibu || !p2.ayah || !p2.ibu) {
      setHasil({ error: 'Mohon lengkapi nama ayah dan ibu untuk kedua pihak.' });
      return;
    }

    // Normalisasi nama (case-insensitive)
    const norm = (str) => str.trim().toLowerCase();
    const n1 = norm(p1.nama);
    const n2 = norm(p2.nama);
    const a1 = norm(p1.ayah);
    const i1 = norm(p1.ibu);
    const a2 = norm(p2.ayah);
    const i2 = norm(p2.ibu);
    const k1 = norm(p1.kakek);
    const n1k = norm(p1.nenek);
    const k2 = norm(p2.kakek);
    const n2k = norm(p2.nenek);

    let hubungan = "Tidak memiliki hubungan kekerabatan langsung";
    let derajat = 0;
    let alasan = "";

    // 1. SAUDARA KANDUNG
    if (a1 === a2 && i1 === i2 && n1 !== n2) {
      hubungan = "Saudara Kandung";
      derajat = 0;
      alasan = `${p1.nama} dan ${p2.nama} memiliki ayah (${p1.ayah}) dan ibu (${p1.ibu}) yang sama. Dalam adat Bugis, pernikahan antar saudara kandung dilarang keras (patturi).`;
    }

    // 2. SAUDARA TIRI (ayah sama, ibu beda)
    else if (a1 === a2 && i1 !== i2) {
      hubungan = "Saudara Tiri (ayah sama)";
      derajat = 1;
      alasan = `${p1.nama} dan ${p2.nama} memiliki ayah yang sama (${p1.ayah}) tetapi ibu berbeda. Dalam adat Bugis, hubungan ini masih dianggap dekat dan pernikahan tidak dianjurkan.`;
    }
    else if (i1 === i2 && a1 !== a2) {
      hubungan = "Saudara Tiri (ibu sama)";
      derajat = 1;
      alasan = `${p1.nama} dan ${p2.nama} memiliki ibu yang sama (${p1.ibu}) tetapi ayah berbeda. Hubungan ini juga dianggap dekat secara adat.`;
    }

    // 3. ANAK ↔ ORANG TUA
    else if (n1 === a2 || n1 === i2) {
      hubungan = "Anak";
      derajat = 1;
      alasan = `${p1.nama} adalah anak dari ${p2.nama}. Dalam adat Bugis, hubungan ini adalah hubungan langsung antara orang tua dan anak.`;
    }
    else if (n2 === a1 || n2 === i1) {
      hubungan = "Anak";
      derajat = 1;
      alasan = `${p2.nama} adalah anak dari ${p1.nama}. Dalam adat Bugis, hubungan ini adalah hubungan langsung antara orang tua dan anak.`;
    }

    // 4. PAMAN/BIBI ↔ KEPOKANAK (masih belum terdeteksi sebelumnya)
    else if (a1 === a2 || a1 === i2 || i1 === a2 || i1 === i2) {
      // Cek lebih lanjut: siapa yang lebih tua?
      const isOrang1Paman = [a2, i2].includes(n1);
      const isOrang2Paman = [a1, i1].includes(n2);

      if (isOrang1Paman) {
        hubungan = "Paman/Bibi";
        derajat = 2;
        alasan = `${p1.nama} adalah paman/bibi dari ${p2.nama}, karena ${p1.nama} adalah saudara dari orang tua ${p2.nama}. Dalam adat Bugis, pernikahan antara paman/bibi dan keponakan dilarang.`;
      } else if (isOrang2Paman) {
        hubungan = "Paman/Bibi";
        derajat = 2;
        alasan = `${p2.nama} adalah paman/bibi dari ${p1.nama}, karena ${p2.nama} adalah saudara dari orang tua ${p1.nama}. Dalam adat Bugis, hubungan ini sangat dekat dan pernikahan tidak diperbolehkan.`;
      } else {
        hubungan = "Anak Paman/Bibi";
        derajat = 2;
        alasan = `${p1.nama} dan ${p2.nama} adalah anak dari saudara kandung. Dalam adat Bugis, hubungan ini dianggap seperti saudara dekat.`;
      }
    }

    // 5. KAKEK/NENEK ↔ CUCU
    else if (k2 === a1 || k2 === i1 || n2 === a1 || n2 === i1) {
      hubungan = "Cucu";
      derajat = 2;
      alasan = `${p1.nama} adalah cucu dari ${p2.nama}, karena ${p1.nama} adalah anak dari anak ${p2.nama}. Dalam adat Bugis, hubungan ini adalah hubungan generasi langsung.`;
    }
    else if (k1 === a2 || k1 === i2 || n1 === a2 || n1 === i2) {
      hubungan = "Cucu";
      derajat = 2;
      alasan = `${p2.nama} adalah cucu dari ${p1.nama}, karena ${p2.nama} adalah anak dari anak ${p1.nama}. Dalam adat Bugis, hubungan kakek-nenek dan cucu sangat dihormati.`;
    }

    // 6. SEPUPU PERTAMA (kakek & nenek sama)
    else if (k1 === k2 && n1k === n2k) {
      hubungan = "Sepupu Pertama";
      derajat = 2;
      alasan = `${p1.nama} dan ${p2.nama} memiliki kakek (${k1}) dan nenek (${n1k}) yang sama. Dalam adat Bugis, pernikahan antar sepupu pertama umumnya dilarang karena dianggap masih terlalu dekat.`;
    }

    // 7. SEPUPU KEDUA (kakek atau nenek sama)
    else if (k1 === k2 || n1k === n2k) {
      hubungan = "Sepupu Kedua";
      derajat = 3;
      alasan = `${p1.nama} dan ${p2.nama} memiliki satu dari kakek atau nenek yang sama. Dalam beberapa daerah Bugis, pernikahan ini bisa dipertimbangkan dengan persetujuan tetua adat.`;
    }

    // 8. KELUARGA JAUH (misal: cucu dari kakek yang sama)
    else if (
      [k1, n1k].includes(a2) || [k1, n1k].includes(i2) ||
      [k2, n2k].includes(a1) || [k2, n2k].includes(i1)
    ) {
      hubungan = "Keluarga Jauh (cucu dari kakek yang sama)";
      derajat = 4;
      alasan = `${p1.nama} dan ${p2.nama} memiliki hubungan melalui kakek/nenek, tetapi tidak langsung. Dalam adat Bugis, hubungan ini dianggap cukup jauh dan bisa dipertimbangkan untuk pernikahan.`;
    }

    // 9. TIDAK ADA HUBUNGAN
    else {
      hubungan = "Tidak memiliki hubungan kekerabatan langsung";
      derajat = 0;
      alasan = `${p1.nama} dan ${p2.nama} tidak memiliki hubungan kekerabatan langsung berdasarkan data yang diberikan. Dalam adat Bugis, pasangan tanpa hubungan kekerabatan dekat lebih dianjurkan untuk menikah.`;
    }

    // STATUS PERNIKAHAN MENURUT ADAT
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

      {hasil && !hasil.error && (
        <div className="mt-8 p-6 bg-white border-l-4 border-bugis-emas rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-bugis-marun">Hasil Pengecekan</h3>

          <div className="mt-4 space-y-3">
            <p><strong>Hubungan:</strong> <span className="text-bugis-emas font-semibold">{hasil.hubungan}</span></p>
            <p><strong>Derajat Kekerabatan:</strong> {hasil.derajat}</p>
            <p><strong>Status Pernikahan:</strong> <span className={
              hasil.statusNikah.includes('✅') ? 'text-green-600' :
              hasil.statusNikah.includes('⚠️') ? 'text-yellow-600' :
              'text-red-600'
            }>{hasil.statusNikah}</span></p>
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