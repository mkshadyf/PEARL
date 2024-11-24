import { useTranslation } from 'react-i18next';
import QuoteRequest from './QuoteRequest';
import Navbar from './Navbar';
import Footer from './Footer';
import TopBar from './TopBar';

export default function Quote() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <div className="pt-32 pb-16">
        <QuoteRequest />
      </div>
      <Footer />
    </div>
  );
} 