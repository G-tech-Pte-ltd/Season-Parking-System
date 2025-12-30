import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Home, Car, Calendar, CreditCard, 
  Globe, BarChart3, ClipboardList, Settings, Info, LogOut 
} from "lucide-react";

const Navbar = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  // Navigation Data Structure
  const navConfig = [
    { label: "Home", icon: <Home size={16} />, path: "/" },
    { 
      label: "Carpark", 
      icon: <Car size={16} />, 
      children: ["Carpark Details"] 
    },
    { 
      label: "Season", 
      icon: <Calendar size={16} />, 
      children: [
        "New", "Edit", "Renewal", "Multi-renewal", "Change Vehicle", 
        "Change Vehicle (Schedule)", "Terminate", "Expiring Season", 
        "Season Groups", "Season Master", "Season History"
      ] 
    },
    { 
      label: "Giro", 
      icon: <CreditCard size={16} />, 
      children: ["Approve/Reject", "Renewal", "Update DDA List", "View History"] 
    },
    { 
      label: "Website", 
      icon: <Globe size={16} />, 
      children: ["New Account Application", "New Season Application", "Payment Report"] 
    },
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

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-[#0f172a]/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-900/20">
      
      {/* Brand / Logo Section */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-blue-500/10 shadow-inner group-hover:scale-110 transition-transform border border-blue-400/30">
          <img 
            src="/gtechfavicon.png" 
            alt="G.tech Logo" 
            className="w-full h-full object-contain p-1"
            onError={(e) => { e.target.src = "https://via.placeholder.com/40?text=Gt"; }}
          />
        </div>
        
        <div className="leading-none">
          <h1 className="text-white font-bold tracking-tight text-sm">G.tech</h1>
          <p className="text-[10px] text-blue-400 font-mono tracking-widest uppercase font-bold">Season Parking</p>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <ul className="flex items-center gap-1">
        {navConfig.map((item, idx) => {
          const hasChildren = !!item.children;
          const isLargeMenu = hasChildren && item.children.length > 6;
          const isActive = location.pathname === item.path;

          return (
            <li 
              key={idx} 
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {/* Top-Level Item */}
              {!hasChildren ? (
                <Link 
                  to={item.path} 
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all
                    ${isActive 
                      ? 'text-blue-400 bg-blue-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all
                  ${activeMenu === item.label 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}>
                  <span className={activeMenu === item.label ? 'text-blue-400' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                  <motion.div
                    animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={12} />
                  </motion.div>
                </button>
              )}

              {/* Mega-Dropdown Logic */}
              <AnimatePresence>
                {hasChildren && activeMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={`
                      absolute top-full left-0 mt-2 bg-[#1e293b] border border-blue-500/30 rounded-2xl shadow-2xl shadow-black/40 p-2
                      ${isLargeMenu ? 'w-[480px]' : 'w-56'}
                    `}
                  >
                    <div className={`grid ${isLargeMenu ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                      {item.children.map((child, cIdx) => (
                        <Link 
                          key={cIdx}
                          to={`/${item.label.toLowerCase()}/${child.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-center justify-between w-full text-left px-4 py-2.5 text-[12px] text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-xl transition-all font-medium"
                        >
                          <span className="truncate">{child}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#60a5fa]" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Right Side: Exit / Actions */}
      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-slate-700 mx-1" />
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
        >
          <LogOut size={14} />
          <span>Exit System</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;