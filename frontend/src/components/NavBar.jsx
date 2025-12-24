import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Home, Car, Calendar, CreditCard, 
  Globe, BarChart3, ClipboardList, Settings, Info, LogOut
} from "lucide-react";

const navConfig = [
  { label: "Home", icon: <Home size={16} />, path: "/" },
  { label: "Carpark", icon: <Car size={16} />, children: ["Carpark Details"] },
  { 
    label: "Season", 
    icon: <Calendar size={16} />, 
    children: [
      "New", "Edit", "Renewal", "Multi-renewal", "Change Vehicle", 
      "Change Vehicle (Schedule)", "Terminate", "Expiring Season", 
      "Season Groups", "Season Master", "Season History"
    ] 
  },
  { label: "Giro", icon: <CreditCard size={16} />, children: ["Approve/Reject", "Renewal", "Update DDA List", "View History"] },
  { label: "Website", icon: <Globe size={16} />, children: ["New Account Application", "New Season Application", "Payment Report"] },
  { 
    label: "Reports", 
    icon: <BarChart3 size={16} />, 
    children: [
      "Revenue Collection", "Review Revenue Collection", "HDB Report", 
      "Mapletree Report", "New Season Report", "Season Allocation", 
      "Season Refund", "Yearly Season Breakdown", "Change Holder Type History", 
      "Change Vehicle History"
    ] 
  },
  { 
    label: "Tasks", 
    icon: <ClipboardList size={16} />, 
    children: [
      "Find Complimentary Ticket", "Reprint Receipt", "Create Refund Form", 
      "Create Season Application Form", "Print Terms and Conditions"
    ] 
  },
  { 
    label: "System", 
    icon: <Settings size={16} />, 
    children: [
      "Run Jobs (Auto)", "Auto Login", "Administrator Functions", 
      "Manage Carpark", "Manage Users", "Add User", "Launch on Windows Startup"
    ] 
  },
  { label: "About", icon: <Info size={16} />, path: "/about" },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-3 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/10">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20">
          G.t
        </div>
        <div className="leading-none">
          <h1 className="text-white font-bold tracking-tight text-sm">G.tech</h1>
          <p className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">Season Parking</p>
        </div>
      </div>

      {/* Nav Links */}
      <ul className="flex items-center gap-1">
        {navConfig.map((item, idx) => {
          const isLargeMenu = item.children && item.children.length > 6;
          
          return (
            <li 
              key={idx} 
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
                ${activeMenu === item.label ? 'bg-white/5 text-purple-400' : 'text-slate-400 hover:text-slate-100'}
              `}>
                {item.icon}
                <span>{item.label}</span>
                {item.children && (
                  <ChevronDown 
                    size={12} 
                    className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              <AnimatePresence>
                {item.children && activeMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`
                      absolute top-full left-0 mt-1 bg-[#121217] border border-white/10 rounded-xl shadow-2xl p-2
                      ${isLargeMenu ? 'w-[450px]' : 'w-56'}
                    `}
                  >
                    <div className={`grid ${isLargeMenu ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                      {item.children.map((child, cIdx) => (
                        <button 
                          key={cIdx}
                          className="group flex items-center justify-between w-full text-left px-3 py-2 text-[12px] text-slate-400 hover:text-white hover:bg-purple-600/10 rounded-lg transition-all"
                        >
                          <span className="truncate">{child}</span>
                          <div className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Action Area */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-px bg-white/10" />
        <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-red-400 transition-colors">
          <LogOut size={14} />
          <span>Exit</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;