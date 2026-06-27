import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ service, onProceed }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-2xl"
    >
      <div className="h-48 overflow-hidden relative group">
        {/* Placeholder for image - since no real images yet, use a gradient block or user-provided image link */}
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-indigo-500 opacity-80 transition-transform duration-500 group-hover:scale-110" />
        )}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400 shadow-sm">
          {service.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{service.name}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ₹{service.price}
          </div>
          <button 
            onClick={() => onProceed(service)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
          >
            {t('proceed')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
