import React from "react";
import { motion } from "framer-motion";
import { Info, Shield, Zap, Cpu, Mail, Globe } from "lucide-react";

const stats = [
  { label: "Active Carparks", value: "142", icon: <Globe size={20} /> },
  { label: "Daily Transactions", value: "12.4k", icon: <Zap size={20} /> },
  { label: "System Uptime", value: "99.98%", icon: <Cpu size={20} /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
      className="p-8 max-w-6xl mx-auto text-slate-600 font-poppins relative"
    >
      {/* Background soft glow elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl -z-10" />

      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="mb-12 border-b border-pink-100 pb-8"
      >
        <div className="flex items-center gap-5 mb-4">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.7 }}
            className="p-4 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-200"
          >
            <Info size={32} />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">System Information</h1>
            <p className="text-pink-500 font-mono text-sm uppercase tracking-widest font-bold">Version 4.0.2 Build 2025-Alpha</p>
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
            whileHover={{ y: -10, borderColor: "#fbcfe8" }}
            className="bg-white border border-pink-50 p-8 rounded-[2rem] text-center group transition-all shadow-sm hover:shadow-xl hover:shadow-pink-100/50"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
              className="inline-flex p-4 bg-pink-50 rounded-2xl text-pink-500 mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors"
            >
              {stat.icon}
            </motion.div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Mission */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-white border border-pink-50 p-8 rounded-[2rem] shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="text-pink-500" size={20} />
            The G.tech Core
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm mb-6">
            The G.tech Season Parking System is an enterprise-grade infrastructure management tool designed to streamline urban parking logistics. Built on a modular microservices architecture, it provides real-time data synchronization across hundreds of carpark nodes.
          </p>
          <ul className="space-y-4">
            {['Automated GIRO processing', 'Smart Vehicle recognition', 'Encrypted Revenue Reporting'].map((feature, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (i * 0.1) }}
                className="flex items-center gap-3 text-xs font-semibold text-slate-600"
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support & Docs */}
        <motion.div 
          variants={itemVariants}
          className="bg-pink-50/30 border-2 border-dashed border-pink-100 p-8 rounded-[2rem]"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Technical Support</h2>
          <div className="space-y-4">
            <motion.a 
              whileHover={{ x: 10, backgroundColor: "#ffffff" }}
              href="mailto:support@gtech.sys" 
              className="flex items-center gap-4 p-5 bg-white shadow-sm border border-pink-50 rounded-2xl transition-all group"
            >
              <div className="p-2 bg-pink-100 rounded-lg text-pink-600 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">System Admin Email</div>
                <div className="text-xs text-slate-400 font-mono">support@gtech.sys</div>
              </div>
            </motion.a>

            <motion.div 
              whileHover={{ x: 10, backgroundColor: "#ffffff" }}
              className="flex items-center gap-4 p-5 bg-white shadow-sm border border-pink-50 rounded-2xl transition-all group cursor-pointer"
            >
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Documentation Wiki</div>
                <div className="text-xs text-slate-400 font-mono">docs.internal.gtech.com</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Credits */}
      <motion.div 
        variants={itemVariants}
        className="mt-16 text-center opacity-40 hover:opacity-100 transition-all cursor-default"
      >
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase font-bold text-slate-400">
          Built with Excellence by the <span className="text-pink-500">G.tech Engineering Team</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;