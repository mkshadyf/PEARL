import { useTranslation } from 'react-i18next';
import { Mail, Phone, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="hidden md:flex items-center space-x-6">
            <a href="mailto:info@pearl-engineering.org" className="flex items-center hover:text-yellow-400">
              <Mail className="h-4 w-4 mr-1" />
              <span>info@pearl-engineering.org</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="tel:+243820984822" className="flex items-center hover:text-yellow-400">
                <Phone className="h-4 w-4 mr-1" />
                <span>+243 820 984 822</span>
              </a>
              <a href="tel:+256781631795" className="flex items-center hover:text-yellow-400">
                <Phone className="h-4 w-4 mr-1" />
                <span>+256 781 631 795</span>
              </a>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
} 