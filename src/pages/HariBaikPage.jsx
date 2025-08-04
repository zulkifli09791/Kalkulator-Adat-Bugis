// src/pages/HariBaikPage.jsx
import HariBaik from '../components/HariBaik';

const HariBaikPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-bugis-marun mb-2 text-center">
        📅 Penentu Hari Baik Pernikahan
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Temukan hari baik menikah berdasarkan tanggal lahir mempelai, menurut kearifan lokal Bugis.
      </p>
      <HariBaik />
    </div>
  );
};

export default HariBaikPage;