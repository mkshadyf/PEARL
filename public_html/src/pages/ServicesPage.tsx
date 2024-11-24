import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-32 pb-16">
        <Services />
      </div>
      <Footer />
    </div>
  );
} 