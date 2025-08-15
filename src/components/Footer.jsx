const Footer = () => {
  return (
    <footer className="bg-bugis-hitam text-bugis-emas py-10 mt-16 border-t-4 border-bugis-emas">
      <div className="container mx-auto px-4 text-center">
        <img
          src="/assets/images/kapalpinisi.jpg"
          alt="Pinisi"
          className="w-20 mx-auto mb-4 opacity-60 filter drop-shadow-lg"
        />
        <h3 className="text-2xl font-adat mb-2">Pinisi Mengarungi Budaya</h3>
        <p className="text-sm opacity-80 max-w-lg mx-auto">
          🎉 Dibuat untuk melestarikan adat dan budaya Bugis. 
          Mari bersama menjaga warisan leluhur.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-lg">
          <a 
            href="https://github.com/zulkifli09791" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white-600"
          > Github
            <i className="fab fa-facebook fa-lg"></i>
          </a>

          <a 
            href="https://instagram.com/zulkifli_145" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pink-500"
          > Instagram
            <i class="fa-brands fa-instagram"></i>
          </a>

          <a 
            href="https://youtube.com/@username" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-red-600"
          > Youtube
            <i className="fab fa-youtube fa-lg"></i>
          </a>
        </div>
        <p className="text-xs mt-6 opacity-50">
          © 2025 Kalkulator Adat Bugis. Hak Cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;