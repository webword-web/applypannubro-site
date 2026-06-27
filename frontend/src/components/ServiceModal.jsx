import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServiceModal = ({ isOpen, onClose, service, onCheckout }) => {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = useState('New');
  const [correctionDetails, setCorrectionDetails] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !service) return null;

  const totalAmount = service.price * quantity;

  const handleCheckout = () => {
    onCheckout({
      service,
      serviceType,
      correctionDetails: serviceType === 'Correction' ? correctionDetails : null,
      quantity,
      totalAmount
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{service.name}</h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Select Service Type
              </label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="serviceType"
                    value="New"
                    checked={serviceType === 'New'}
                    onChange={(e) => setServiceType(e.target.value)}
                  />
                  <div className="text-center p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 text-slate-600 dark:text-slate-400 font-medium transition-all">
                    New
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="serviceType"
                    value="Correction"
                    checked={serviceType === 'Correction'}
                    onChange={(e) => setServiceType(e.target.value)}
                  />
                  <div className="text-center p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 text-slate-600 dark:text-slate-400 font-medium transition-all">
                    Correction
                  </div>
                </label>
              </div>
            </div>

            {/* Correction Details Textarea */}
            {serviceType === 'Correction' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Correction Details
                </label>
                <textarea
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                  rows="3"
                  placeholder="Describe the corrections needed..."
                  value={correctionDetails}
                  onChange={(e) => setCorrectionDetails(e.target.value)}
                  required
                />
              </motion.div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('quantity')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-slate-900 dark:text-white min-w-[2ch] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('total')}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalAmount}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                {t('checkout')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceModal;
