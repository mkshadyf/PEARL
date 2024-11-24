import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/pearlsarl', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/pearlsarl', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/pearlsarl', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/pearlsarl', label: 'Instagram' }
  ];

  const quickLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/quote', label: t('nav.requestQuote') }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/logo-white.png" alt="PEARL SARL" className="h-12" />
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p>{t('contact.addressLine1')}</p>
                  <p>{t('contact.addressLine2')}</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p>+243 820 984 822</p>
                  <p>+256 781 631 795</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="mailto:info@pearl-engineering.org"
                  className="hover:text-yellow-400 transition-colors"
                >
                  info@pearl-engineering.org
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications & Memberships */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.certifications')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Add your certification logos here */}
              <img src="/cert1.png" alt="Certification 1" className="h-16" />
              <img src="/cert2.png" alt="Certification 2" className="h-16" />
              <img src="/cert3.png" alt="Certification 3" className="h-16" />
              <img src="/cert4.png" alt="Certification 4" className="h-16" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {currentYear} PEARL SARL. {t('footer.rights')}
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}