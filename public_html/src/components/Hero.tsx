import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-black/60 z-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581093458791-9d42d0aad77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 transition-colors font-semibold"
          >
            {t('hero.cta')}
          </motion.a>
          <motion.a 
            href="https://pearl-engineering.org/wp-content/uploads/2021/08/PELS-Profile-.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white px-8 py-3 rounded-md hover:bg-white hover:text-gray-900 transition-colors font-semibold"
          >
            {t('about.downloadProfile')}
          </motion.a>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </div>
  );
}