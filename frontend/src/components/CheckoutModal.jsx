import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CheckoutModal = ({ isOpen, onClose, orderDetails }) => {
  const { t } = useTranslation();
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !orderDetails) return null;

  const handlePayment = async () => {
    if (!customerName || !mobileNumber) {
      alert('Please enter name and mobile number');
      return;
    }
    
    setIsProcessing(true);
    // Simulate API call to create order
    setTimeout(() => {
      setIsProcessing(false);
      
      // WhatsApp redirection logic
      const adminPhone = "918525041700";
      const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
      
      const message = `*Payment Completed*\n\n*Invoice No:* ${invoiceNo}\n*Customer Name:* ${customerName}\n*Mobile Number:* ${mobileNumber}\n*Service:* ${orderDetails.service.name}\n*Type:* ${orderDetails.serviceType}\n*Quantity:* ${orderDetails.quantity}\n*Amount:* ₹${orderDetails.totalAmount}\n*Status:* Completed`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, '_blank');
      
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-50 dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <FileText className="text-primary-500" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Invoice Preview</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Invoice Details Left Side */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Customer Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Mobile Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Order Summary</h4>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between"><span>Service:</span> <span className="font-medium text-slate-900 dark:text-white">{orderDetails.service.name}</span></div>
                  <div className="flex justify-between"><span>Type:</span> <span>{orderDetails.serviceType}</span></div>
                  {orderDetails.correctionDetails && (
                    <div className="flex justify-between"><span>Correction:</span> <span className="truncate max-w-[150px]">{orderDetails.correctionDetails}</span></div>
                  )}
                  <div className="flex justify-between"><span>Quantity:</span> <span>{orderDetails.quantity}</span></div>
                  <div className="flex justify-between font-semibold text-base text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                    <span>Total Amount:</span> <span>₹{orderDetails.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section Right Side */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-center">Scan to Pay</h4>
                <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700">
                   {/* Placeholder for QR Code */}
                   <div className="text-center p-4">
                     <div className="w-48 h-48 bg-white p-2 border-4 border-primary-500 mx-auto grid grid-cols-4 grid-rows-4 gap-1">
                        {/* Fake QR pattern */}
                        {[...Array(16)].map((_, i) => (
                           <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                        ))}
                     </div>
                     <p className="mt-4 text-sm font-mono text-slate-500 dark:text-slate-400">UPI: applypannubro@upi</p>
                   </div>
                </div>
                <div className="flex justify-center gap-2 text-slate-400 mb-6">
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded">GPay</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded">PhonePe</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded">Paytm</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <CheckCircle />
                    {t('payment_completed')}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
