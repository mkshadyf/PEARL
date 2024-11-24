import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, HardHat, Wrench, Building2, Recycle, Box } from 'lucide-react';

const services = [
  {
    icon: <Truck className="h-12 w-12" />,
    key: 'logistics'
  },
  {
    icon: <HardHat className="h-12 w-12" />,
    key: 'drilling'
  },
  {
    icon: <Wrench className="h-12 w-12" />,
    key: 'metalStructures'
  },
  {
    icon: <Building2 className="h-12 w-12" />,
    key: 'civilEngineering'
  },
  {
    icon: <Recycle className="h-12 w-12" />,
    key: 'wasteManagement'
  },
  {
    icon: <Box className="h-12 w-12" />,
    key: 'transport'
  }
];

export default function Services() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="text-yellow-500 mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`services.${service.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}