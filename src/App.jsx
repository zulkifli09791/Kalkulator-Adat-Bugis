// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import PanaiPage from './pages/PanaiPage';
import HariBaikPage from './pages/HariBaikPage';
import KekerabatanPage from './pages/KekerabatanPage';
import LontaraPage from './pages/LontaraPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/panai" element={<PanaiPage />} />
            <Route path="/haribai" element={<HariBaikPage />} />
            <Route path="/kekerabatan" element={<KekerabatanPage />} />
            <Route path="/lontara" element={<LontaraPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;