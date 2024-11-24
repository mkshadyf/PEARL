import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';
import { ArrowLeft, Clock, CheckCircle, Users } from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchService();
  }, [id]);

  async function fetchService() {
    try {
      if (!id) return;
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('services.backToServices')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700">{service.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{t('services.deliveryTime')}</h3>
                  <p className="text-gray-500">{t('services.fastDelivery')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{t('services.quality')}</h3>
                  <p className="text-gray-500">{t('services.highQuality')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{t('services.team')}</h3>
                  <p className="text-gray-500">{t('services.expertTeam')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/quote"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
              >
                {t('services.requestQuote')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 