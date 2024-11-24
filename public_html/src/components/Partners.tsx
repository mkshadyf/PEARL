import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../lib/supabase';
import type { Partner } from '../types';
import { ExternalLink } from 'lucide-react';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Partner['category'] | 'all'>('all');
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPartners = activeCategory === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === activeCategory);

  const categories = [
    { value: 'all', label: t('partners.categories.all') },
    { value: 'client', label: t('partners.categories.clients') },
    { value: 'supplier', label: t('partners.categories.suppliers') },
    { value: 'collaborator', label: t('partners.categories.collaborators') }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="partners" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-12">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value as Partner['category'] | 'all')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.value
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredPartners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{partner.description}</p>
              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700"
                >
                  <span className="text-sm">{t('partners.visitWebsite')}</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 