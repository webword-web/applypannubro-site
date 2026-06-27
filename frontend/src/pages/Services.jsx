import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import CheckoutModal from '../components/CheckoutModal';

const Services = () => {
  const { t } = useTranslation();
  
  // Dummy data for initial display (this would normally come from an API)
  const [services, setServices] = useState([
    { _id: '1', name: 'PAN Card Registration', description: 'Apply for a new PAN card or make corrections to an existing one.', price: 150, category: 'Documents', image: '' },
    { _id: '2', name: 'Aadhar Card Update', description: 'Update name, address, or phone number in your Aadhar card.', price: 100, category: 'Documents', image: '' },
    { _id: '3', name: 'Passport Application', description: 'Apply for a fresh passport or renew your old passport easily.', price: 1500, category: 'Travel', image: '' },
    { _id: '4', name: 'FSSAI Registration', description: 'Get your food safety license for your business.', price: 500, category: 'Business', image: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const categories = ['All', 'Documents', 'Travel', 'Business'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProceed = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleCheckout = (details) => {
    setOrderDetails(details);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Browse through our wide range of digital services. Fast, secure, and hassle-free.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-4 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onProceed={handleProceed}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No services found matching your criteria.</p>
          </div>
        )}

      </div>

      <ServiceModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default Services;
