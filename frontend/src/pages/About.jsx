import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            About <span className="text-gradient">Company</span>
          </motion.h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-indigo-500 mx-auto rounded-full mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-indigo-500 rounded-3xl transform rotate-3 scale-105 opacity-20 dark:opacity-40"></div>
              {/* Placeholder for CEO Image */}
              <div className="relative bg-white dark:bg-slate-800 p-2 rounded-3xl shadow-xl">
                <div className="aspect-[4/5] rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                  <span className="text-slate-400">CEO Image Placeholder</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dhanush</h2>
              <p className="text-xl text-primary-600 dark:text-primary-400 font-medium">Founder & CEO, Apply Pannu Bro</p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Apply Pannu Bro was founded with a singular vision: to simplify digital services and documentation for everyone. We believe that applying for essential documents shouldn't be a complex, time-consuming process.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Education</h4>
                  <p className="text-sm text-slate-500">Bachelor of Computer Applications (BCA)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Experience</h4>
                  <p className="text-sm text-slate-500">5+ Years in Digital Services</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To provide accessible, fast, and secure digital documentation services to citizens, removing the friction from bureaucratic processes and empowering individuals through technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl"
          >
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To become the most trusted digital service partner in the country, known for our reliability, transparency, and exceptional customer support in the digital era.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
