import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://pearl-engineering.org/wp-content/uploads/2021/08/PEARL-Profile-.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600"
              >
                {t('about.downloadProfile')}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-8"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <Users className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('about.mission.title')}</h3>
              <p className="text-gray-600">{t('about.mission.description')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <Target className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('about.vision.title')}</h3>
              <p className="text-gray-600">{t('about.vision.description')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <Heart className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('about.values.title')}</h3>
              <p className="text-gray-600">{t('about.values.description')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}