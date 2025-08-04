import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-bugis-marun text-bugis-emas shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-adat flex items-center gap-2">
          🏡 <span className="hidden sm:inline">Kalkulator</span> Adat Bugis
        </Link>
        <ul className="flex space-x-6 text-lg">
          {[
            { path: '/', label: 'Beranda' },
            { path: '/panai', label: 'Panai’' },
            { path: '/haribai', label: 'Hari Baik' },
            { path: '/kekerabatan', label: 'Kekerabatan' },
            { path: '/lontara', label: 'Lontara' },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-emas hover:underline transition duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bugis-emas group-hover:w-full transition-all"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;