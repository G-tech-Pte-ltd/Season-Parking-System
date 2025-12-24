import React from "react";
import { motion } from "framer-motion";
import { Info, Shield, Zap, Cpu, Mail, Globe } from "lucide-react";

const stats = [
  { label: "Active Carparks", value: "142", icon: <Globe size={20} /> },
  { label: "Daily Transactions", value: "12.4k", icon: <Zap size={20} /> },
  { label: "System Uptime", value: "99.98%", icon: <Cpu size={20} /> },
];

// Animation Variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutPage = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-8 max-w-6xl mx-auto text-slate-300 font-poppins"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            className="p-3 bg-purple-600/20 text-purple-400 rounded-2xl border border-purple-500/30"
          >
            <Info size={32} />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">System Information</h1>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Version 4.0.2 Build 2025-Alpha</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, borderColor: "rgba(168, 85, 247, 0.5)" }}
            className="bg-gray-900/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl text-center group transition-colors shadow-xl"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
              className="inline-flex p-3 bg-white/5 rounded-full text-purple-400 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors"
            >
              {stat.icon}
            </motion.div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs uppercase tracking-tighter text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Mission */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="text-purple-400" size={20} />
            The G.tech Core
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm mb-4">
            The G.tech Season Parking System is an enterprise-grade infrastructure management tool designed to streamline urban parking logistics. Built on a modular microservices architecture, it provides real-time data synchronization across hundreds of carpark nodes.
          </p>
          <ul className="space-y-3">
            {['Automated GIRO processing', 'Smart Vehicle recognition', 'Encrypted Revenue Reporting'].map((feature, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (i * 0.1) }}
                className="flex items-center gap-2 text-xs text-slate-300"
              >
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support & Docs */}
        <motion.div 
          variants={itemVariants}
          className="bg-gray-900/20 border border-dashed border-white/10 p-8 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Technical Support</h2>
          <div className="space-y-4">
            <motion.a 
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
              href="mailto:support@gtech.sys" 
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl transition-all group"
            >
              <Mail className="text-purple-400" size={20} />
              <div>
                <div className="text-sm font-bold text-white">System Admin Email</div>
                <div className="text-xs text-slate-500 tracking-tight">support@gtech.sys</div>
              </div>
            </motion.a>

            <motion.div 
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl transition-all group cursor-pointer"
            >
              <Globe className="text-blue-400" size={20} />
              <div>
                <div className="text-sm font-bold text-white">Documentation Wiki</div>
                <div className="text-xs text-slate-500 tracking-tight">docs.internal.gtech.com</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Credits */}
      <motion.div 
        variants={itemVariants}
        className="mt-16 text-center opacity-30 grayscale hover:grayscale-0 transition-all cursor-default"
      >
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">
          Built with Excellence by the <span className="text-purple-500">G.tech Engineering Team</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;