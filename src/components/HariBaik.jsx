import { useState } from 'react';

const HariBaik = () => {
  const [tanggalPria, setTanggalPria] = useState('');
  const [tanggalWanita, setTanggalWanita] = useState('');
  const [tahunNikah, setTahunNikah] = useState('');

  const [hasil, setHasil] = useState(null);

  const hitungHariBaik = () => {
    if (!tanggalPria || !tanggalWanita || !tahunNikah) {
      setHasil(null);
      return;
    }

    const pria = new Date(tanggalPria);
    const wanita = new Date(tanggalWanita);
    const tahun = parseInt(tahunNikah);

    // Validasi: Tahun nikah harus di masa depan dari keduanya
    const umurPria = tahun - pria.getFullYear();
    const umurWanita = tahun - wanita.getFullYear();

    if (umurPria < 17 || umurWanita < 17) {
      setHasil({
        error: 'Usia salah satu mempelai terlalu muda. Harus minimal 17 tahun saat menikah.'
      });
      return;
    }

    if (tahun <= Math.max(pria.getFullYear(), wanita.getFullYear())) {
      setHasil({
        error: 'Tahun pernikahan harus di masa depan dari tanggal lahir keduanya.'
      });
      return;
    }

    // Hitung hari baik: berdasarkan kombinasi zodiak dan adat
    const bulanPria = pria.getMonth();
    const bulanWanita = wanita.getMonth();

    // Prioritas: musim kemarau (April-Oktober) di Sulawesi Selatan
    const bulanBaik = [4, 5, 6, 7, 8, 9, 10]; // April - Oktober

    // Gabungkan bulan lahir untuk tentukan bulan pernikahan
    const bulanGabungan = (bulanPria + bulanWanita + 3) % 12;
    let bulanNikah = bulanGabungan;

    // Pastikan bulan nikah di musim kemarau
    if (!bulanBaik.includes(bulanNikah)) {
      bulanNikah = 6; // Juli (musim terbaik)
    }

    // Hari: tanggal ganjil dianggap lebih baik dalam adat Bugis
    const hariNikah = 17; // Tanggal 17 (ganjil, angka keberuntungan)

    const tanggalBaik = new Date(tahun, bulanNikah, hariNikah);

    // Alasan adat
    const alasan = `
      Tanggal ini dipilih berdasarkan pertimbangan adat Bugis:
      - Musim kemarau (April-Oktober) adalah waktu yang terbaik untuk mengadakan pesta adat.
      - Tanggal ganjil (17) dianggap membawa keberuntungan dan keharmonisan.
      - Bulan ${tanggalBaik.toLocaleString('id-ID', { month: 'long' })} merupakan estimasi waktu tradisional masyarakat Bugis mengadakan pernikahan.
      - Kedua mempelai telah mencapai usia dewasa dan siap secara adat.
    `;

    setHasil({
      tanggal: tanggalBaik,
      alasan: alasan.trim()
    });
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-bugis-marun mb-6 font-adat">📅 Penentu Hari Baik Pernikahan</h2>
      <p className="text-gray-600 mb-6">
        Masukkan tanggal lahir mempelai dan pilih tahun pernikahan. Sistem akan menentukan hari baik menurut kearifan lokal Bugis.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2">Tanggal Lahir Mempelai Pria</label>
          <input
            type="date"
            value={tanggalPria}
            onChange={(e) => setTanggalPria(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Tanggal Lahir Mempelai Wanita</label>
          <input
            type="date"
            value={tanggalWanita}
            onChange={(e) => setTanggalWanita(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Tahun Pernikahan yang Diinginkan</label>
          <input
            type="number"
            min={new Date().getFullYear()}
            placeholder="Contoh: 2025"
            value={tahunNikah}
            onChange={(e) => setTahunNikah(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
          />
        </div>

        <button
          onClick={hitungHariBaik}
          className="btn-emas w-full py-3 text-lg"
        >
          🔍 Tentukan Hari Baik
        </button>
      </div>

      {hasil && !hasil.error && (
        <div className="mt-8 p-6 bg-bugis-putih border-l-4 border-bugis-emas rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-bugis-marun">🎉 Hari Baik Pernikahan:</h3>
          <p className="text-xl text-bugis-emas mt-2">
            <strong>{hasil.tanggal.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
          </p>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-bugis-marun">Alasan Pemilihan:</h4>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{hasil.alasan}</p>
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

export default HariBaik;