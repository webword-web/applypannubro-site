import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white mb-4 block">
              Apply Pannu Bro
            </span>
            <p className="mb-4 text-slate-400 max-w-sm">
              {t('hero_subtitle')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">{t('home')}</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">{t('services')}</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">{t('about')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-primary-500" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-primary-500" />
                <span>+91 8525041700</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-primary-500" />
                <span>dhanushthm13@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {t('footer_text')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
