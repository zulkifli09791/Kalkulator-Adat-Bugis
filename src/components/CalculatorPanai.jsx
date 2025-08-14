import { useState } from 'react';

const CalculatorPanai = () => {
  const [form, setForm] = useState({
    nama: '',
    pendidikan: '',
    pekerjaan: '',
    daerah: '',
    suku: '',
    bangsawan: false,
    kecantikan: 3,
    reputasi: 'baik',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const calculatePanai = () => {
    let base = 15_000_000; // Dasar panai’ (Bone, Wajo, dll)
    let total = base;
    const faktor = [];

    // 1. Pendidikan
    const pendidikanMap = {
      sma: { nilai: 10_000_000, label: 'SMA' },
      diploma: { nilai: 15_000_000, label: 'Diploma' },
      sarjana: { nilai: 30_000_000, label: 'Sarjana' },
      magister: { nilai: 50_000_000, label: 'Magister' },
      doktor: { nilai: 70_000_000, label: 'Doktor' },
    };
    if (form.pendidikan && pendidikanMap[form.pendidikan]) {
      total += pendidikanMap[form.pendidikan].nilai;
      faktor.push(`Pendidikan ${pendidikanMap[form.pendidikan].label}: +${formatRupiah(pendidikanMap[form.pendidikan].nilai)}`);
    }

    // 2. Pekerjaan
    const pekerjaanMap = {
      pengangguran: {nilai: 5_000_000, label: 'Pengangguran'},
      buruh: { nilai:15_000_000, label: 'Buruh' },
      guru: { nilai: 30_000_000, label: 'Guru' },
      dokter: { nilai: 100_000_000, label: 'Dokter' },
      pejabat: { nilai: 100_000_000, label: 'Pejabat' },
      pengusaha: { nilai: 50_000_000, label: 'Pengusaha' },
    };
    if (form.pekerjaan && pekerjaanMap[form.pekerjaan]) {
      total += pekerjaanMap[form.pekerjaan].nilai;
      faktor.push(`Pekerjaan ${pekerjaanMap[form.pekerjaan].label}: +${formatRupiah(pekerjaanMap[form.pekerjaan].nilai)}`);
    }

    // 3. Asal Daerah (dengan nuansa adat)
    const daerahMap = {
      bone: { nilai: 20_000_000, label: 'Bone (Arung)', alasan: 'Daerah kerajaan, panai’ tinggi' },
      wajo: { nilai: 15_000_000, label: 'Wajo (Kerajaan Maritim)', alasan: 'Pusat perdagangan, panai’ tinggi' },
      gowa: { nilai: 18_000_000, label: 'Gowa (Kerajaan Islam)', alasan: 'Pusat kebudayaan, panai’ tinggi' },
      maros: { nilai: 10_000_000, label: 'Maros', alasan: 'Daerah pegunungan' },
      lainnya: { nilai: 8_000_000, label: 'Lainnya', alasan: 'Di luar kerajaan utama' },
    };
    if (form.daerah && daerahMap[form.daerah]) {
      total += daerahMap[form.daerah].nilai;
      faktor.push(`${daerahMap[form.daerah].label}: +${formatRupiah(daerahMap[form.daerah].nilai)} (${daerahMap[form.daerah].alasan})`);
    }

    // 4. Suku (opsional tapi berpengaruh)
    const sukuMap = {
      bugis: { nilai: 20_000_000, label: 'Bugis' },
      makassar: { nilai: 15_000_000, label: 'Makassar' },
      toraja: { nilai: 5_000_000, label: 'Toraja' },
      jawa: { nilai: 5_000_000, label: 'Jawa' },
      lainnya: { nilai: 2_000_000, label: 'Lainnya' },
    };
    if (form.suku && sukuMap[form.suku]) {
      total += sukuMap[form.suku].nilai;
      faktor.push(`Suku ${sukuMap[form.suku].label}: +${formatRupiah(sukuMap[form.suku].nilai)}`);
    }

    // 5. Bangsawan (Arung / Karaeng)
    if (form.bangsawan) {
      total += 25_000_000;
      faktor.push('Status Bangsawan (Arung): +25.000.000');
    }

    // 6. Kecantikan (subjektif, skala 1-5)
    const kecantikanBonus = (form.kecantikan - 3) * 5_000_000;
    if (kecantikanBonus > 0) {
      total += kecantikanBonus;
      faktor.push(`Kecantikan (Skala ${form.kecantikan}/5): +${formatRupiah(kecantikanBonus)}`);
    } else if (kecantikanBonus < 0) {
      faktor.push(`Kecantikan (Skala ${form.kecantikan}/5): tidak menambah`);
    }

    // 7. Reputasi Keluarga
    const reputasiMap = {
      baik: { nilai: 5_000_000, label: 'Baik' },
      sangat_baik: { nilai: 10_000_000, label: 'Sangat Baik' },
      biasa: { nilai: 0, label: 'Biasa' },
    };
    if (form.reputasi && reputasiMap[form.reputasi]) {
      total += reputasiMap[form.reputasi].nilai;
      faktor.push(`Reputasi Keluarga ${reputasiMap[form.reputasi].label}: +${formatRupiah(reputasiMap[form.reputasi].nilai)}`);
    }

    return { total, faktor };
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const { total, faktor } = calculatePanai();

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-bugis-marun mb-2 font-adat">💰 Kalkulator Uang Panai’ Adat Bugis</h2>
      <p className="text-gray-600 mb-6">
        Isi data sesuai adat Bugis untuk estimasi panai’ yang sesuai. Semakin tinggi pendidikan, pekerjaan, dan asal daerah, semakin tinggi panai’.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2">Nama Calon Mempelai</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Contoh: Andi Pattingalloang"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Pendidikan Terakhir</label>
          <select
            name="pendidikan"
            value={form.pendidikan}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          >
            <option value="">Pilih pendidikan</option>
            <option value="sma">SMA</option>
            <option value="diploma">Diploma</option>
            <option value="sarjana">Sarjana</option>
            <option value="magister">Magister</option>
            <option value="doktor">Doktor</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Pekerjaan</label>
          <select
            name="pekerjaan"
            value={form.pekerjaan}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          >
            <option value="">Pilih pekerjaan</option>
            <option value="pengangguran">Pengangguran</option>
            <option value="buruh">Buruh</option>
            <option value="guru">Guru</option>
            <option value="dokter">Dokter</option>
            <option value="pejabat">Pejabat</option>
            <option value="pengusaha">Pengusaha</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Asal Daerah</label>
          <select
            name="daerah"
            value={form.daerah}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          >
            <option value="">Pilih daerah</option>
            <option value="bone">Bone (Kerajaan Arung)</option>
            <option value="wajo">Wajo (Kerajaan Maritim)</option>
            <option value="gowa">Gowa (Kerajaan Islam)</option>
            <option value="maros">Maros</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Suku</label>
          <select
            name="suku"
            value={form.suku}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          >
            <option value="">Pilih suku</option>
            <option value="bugis">Bugis</option>
            <option value="makassar">Makassar</option>
            <option value="toraja">Toraja</option>
            <option value="jawa">Jawa</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="bangsawan"
            id="bangsawan"
            checked={form.bangsawan}
            onChange={handleChange}
            className="mr-3 h-5 w-5"
          />
          <label htmlFor="bangsawan" className="text-gray-700">
            Termasuk keluarga bangsawan (Arung / Karaeng)
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Tingkat Kecantikan (1-5): {form.kecantikan}</label>
          <input
            type="range"
            name="kecantikan"
            min="1"
            max="5"
            value={form.kecantikan}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-sm text-gray-500">1 = Biasa, 5 = Sangat Menawan</div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Reputasi Keluarga</label>
          <select
            name="reputasi"
            value={form.reputasi}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          >
            <option value="biasa">Biasa</option>
            <option value="baik">Baik</option>
            <option value="sangat_baik">Sangat Baik</option>
          </select>
        </div>

        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-bugis-marun to-bugis-emas text-white p-6 rounded-xl shadow-lg text-2xl font-bold">
            Estimasi Uang Panai’: {formatRupiah(total)}
          </div>
        </div>
      </form>

      {/* Detail Perhitungan */}
      {faktor.length > 0 && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold text-bugis-marun mb-4">🔍 Detail Perhitungan:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {faktor.map((item, i) => (
              <li key={i} className="before:content-['•'] before:mr-2">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Penjelasan Budaya */}
      <div className="mt-8 p-5 bg-bugis-putih border-l-4 border-bugis-emas rounded-lg">
        <h4 className="font-semibold text-bugis-marun">📘 Penjelasan Budaya:</h4>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
          Uang panai’ adalah bentuk penghargaan adat dalam pernikahan Bugis. 
          Besar panai’ ditentukan oleh pendidikan, pekerjaan, asal daerah, dan status sosial. 
          Daerah kerajaan seperti Bone, Wajo, dan Gowa memiliki panai’ yang lebih tinggi karena martabat adat. 
          Keluarga bangsawan (Arung) juga menaikkan nilai panai’. 
          Dalam adat Bugis, panai’ bukan transaksi, melainkan simbol penghormatan terhadap keluarga mempelai wanita.
        </p>
      </div>
    </div>
  );
};

export default CalculatorPanai;