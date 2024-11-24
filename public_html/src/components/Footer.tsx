import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src="/logo.png" alt="PELS SARL" className="h-12 mb-6" />
            <p className="mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-yellow-500 transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-500 transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-yellow-500 transition-colors">
                  {t('nav.mission')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-500 transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li>+243 820 984 822</li>
              <li>+256 781 631 795</li>
              <li>info@pearl-engineering.org</li>
              <li>Durba, Doko, Province Haut-Uélé</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {currentYear} PELS SARL. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}