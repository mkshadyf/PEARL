import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span>{i18n.language.toUpperCase()}</span>
    </button>
  );
}