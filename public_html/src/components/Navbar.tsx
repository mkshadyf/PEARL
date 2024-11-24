import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calculator } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: isHomePage ? "#about" : "/about", label: t('nav.about') },
    { to: isHomePage ? "#services" : "/services", label: t('nav.services') },
    { to: isHomePage ? "#projects" : "/projects", label: t('nav.projects') },
    { to: isHomePage ? "#partners" : "/partners", label: t('nav.partners') },
    { to: isHomePage ? "#contact" : "/contact", label: t('nav.contact') },
  ];

  const linkComponent = (to: string, label: string, className: string) => {
    return to.startsWith('#') ? (
      <a href={to} className={className}>{label}</a>
    ) : (
      <Link to={to} className={className}>{label}</Link>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg top-0'
          : 'bg-transparent top-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="PEARL SARL" className="h-12" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              linkComponent(
                link.to,
                link.label,
                `transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-yellow-500'
                    : 'text-white hover:text-yellow-400'
                }`
              )
            ))}
            <Link 
              to="/quote"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                isScrolled
                  ? 'text-white bg-yellow-600 hover:bg-yellow-700'
                  : 'text-yellow-900 bg-yellow-400 hover:bg-yellow-500'
              }`}
            >
              <Calculator className="h-4 w-4 mr-2" />
              {t('nav.requestQuote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/quote"
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-900 bg-yellow-400 hover:bg-yellow-500"
            >
              <Calculator className="h-4 w-4 mr-1" />
              <span className="sr-only md:not-sr-only">{t('nav.requestQuote')}</span>
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              linkComponent(
                link.to,
                link.label,
                "block px-3 py-2 text-gray-700 hover:text-yellow-500"
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}