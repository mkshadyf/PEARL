import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-32 pb-16">
        <About />
      </div>
      <Footer />
    </div>
  );
} 