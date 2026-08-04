import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'id'>('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Detect language from URL
    if (window.location.pathname.startsWith('/id')) {
      setLang('id');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinksEn = [
    { name: 'Home', href: '/#' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Fleet', href: '/#fleet' },
    { name: 'Network', href: '/#network' },
    { name: 'Contact', href: '/#contact' },
  ];

  const navLinksId = [
    { name: 'Beranda', href: '/id/#' },
    { name: 'Tentang Kami', href: '/id/#about' },
    { name: 'Layanan', href: '/id/#services' },
    { name: 'Armada', href: '/id/#fleet' },
    { name: 'Jaringan', href: '/id/#network' },
    { name: 'Kontak', href: '/id/#contact' },
  ];

  const currentLinks = lang === 'id' ? navLinksId : navLinksEn;

  const toggleLanguage = () => {
    if (lang === 'en') {
      window.location.href = '/id/';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href={lang === 'id' ? '/id/' : '/'} className="flex-shrink-0 flex items-center gap-1 md:gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isScrolled ? 'text-electric' : 'text-white'}`}>
              <circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </svg>
            <span className={`font-extrabold text-base md:text-xl tracking-tight transition-colors ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
              SEAFARER LOGISTICS
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {currentLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all hover:text-electric hover:-translate-y-0.5 ${
                  isScrolled ? 'text-navy-800' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-2 text-sm font-bold transition-colors hover:text-electric ${
              isScrolled ? 'text-navy-800' : 'text-white/90'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
               {lang === 'id' ? 'ID' : 'EN'}
            </button>
            <a 
              href={lang === 'id' ? '/id/#quote' : '/#quote'}
              className="bg-electric hover:bg-electric-hover text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              {lang === 'id' ? 'Minta Penawaran' : 'Request Quote'}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className={`text-sm font-bold ${isScrolled ? 'text-navy-900' : 'text-white'}`}
            >
              {lang === 'id' ? 'ID' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-navy-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full left-0 top-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {currentLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-navy-800 hover:text-electric hover:bg-slate-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 pt-4 pb-2 border-t border-slate-100 mt-2">
              <a 
                href={lang === 'id' ? '/id/#quote' : '/#quote'}
                className="w-full flex items-center justify-center bg-electric hover:bg-electric-hover text-white px-5 py-3 rounded-md text-base font-medium transition-colors"
              >
                {lang === 'id' ? 'Minta Penawaran' : 'Request Quote'}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
