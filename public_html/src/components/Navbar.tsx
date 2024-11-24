import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="bg-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <img src="/logo.png" alt="PELS SARL" className="h-12" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-yellow-500 transition-colors">
              {t('nav.about')}
            </a>
            <a href="#services" className="text-gray-700 hover:text-yellow-500 transition-colors">
              {t('nav.services')}
            </a>
            <a href="#mission" className="text-gray-700 hover:text-yellow-500 transition-colors">
              {t('nav.mission')}
            </a>
            <a href="#values" className="text-gray-700 hover:text-yellow-500 transition-colors">
              {t('nav.values')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-yellow-500 transition-colors">
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-yellow-500">
              {t('nav.about')}
            </a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-yellow-500">
              {t('nav.services')}
            </a>
            <a href="#mission" className="block px-3 py-2 text-gray-700 hover:text-yellow-500">
              {t('nav.mission')}
            </a>
            <a href="#values" className="block px-3 py-2 text-gray-700 hover:text-yellow-500">
              {t('nav.values')}
            </a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-yellow-500">
              {t('nav.contact')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}