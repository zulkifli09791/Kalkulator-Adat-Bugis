import { useState } from 'react';

// Mapping Latin ke Unicode Lontara (hanya huruf dasar)
const latinToLontaraMap = {
  a: 'ᨕ',    e: '᨞',    i: '᨜',    o: '᨟',    u: '᨝',
  b: 'ᨀ',    c: 'ᨆ',    d: 'ᨁ',    g: 'ᨐ',    h: 'ᨗ',
  j: 'ᨑ',    k: 'ᨍ',    l: 'ᨌ',    m: 'ᨎ',    n: 'ᨏ',
  p: 'ᨅ',    r: 'ᨋ',    s: 'ᨔ',  t: 'ᨓ',    w: 'ᨕ',
  y: 'ᨊ'
};

// Mapping Lontara ke Latin
const lontaraToLatinMap = Object.fromEntries(
  Object.entries(latinToLontaraMap).map(([k, v]) => [v, k])
);

const LontaraConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('lontara'); // 'lontara' or 'latin'

  const convert = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let result = '';
    if (mode === 'lontara') {
      // Latin → Lontara
      for (let char of input.toLowerCase()) {
        result += latinToLontaraMap[char] || char;
      }
    } else {
      // Lontara → Latin
      for (let char of input) {
        result += lontaraToLatinMap[char] || char;
      }
    }
    setOutput(result);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-bugis-marun mb-6 font-adat">✒️ Konversi Aksara Lontara</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Mode Konversi</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-bugis-emas"
        >
          <option value="lontara">Latin → Lontara</option>
          <option value="latin">Lontara → Latin</option>
        </select>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan teks..."
        className="w-full p-4 border rounded-lg h-24 mb-4 focus:ring-2 focus:ring-bugis-emas"
      />

      <button
        onClick={convert}
        className="btn-emas hover:bg-yellow-700 transition"
      >
        🔁 Konversi
      </button>

      <div className="mt-6 p-4 border-2 border-dashed border-bugis-emas rounded-lg bg-white">
        <h3 className="font-semibold text-bugis-marun">Hasil Konversi:</h3>
        <p className="mt-2 text-2xl font-mono" style={{ fontFamily: 'sans-serif' }}>
          {output || 'Hasil akan muncul di sini...'}
        </p>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Catatan:</strong> Konversi ini dasar dan tidak luput dari kemungkinkan kesalahan. Aksara Lontara memiliki bentuk kontekstual dan tidak semua huruf tersedia di font Unicode saat ini.</p>
      </div>
    </div>
  );
};

export default LontaraConverter;