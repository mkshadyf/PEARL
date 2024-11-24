import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-32 pb-16">
        <Contact />
      </div>
      <Footer />
    </div>
  );
} 