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

  // Navigation Data Structure with Explicit Paths
  const navConfig = [
    { label: "Home", icon: <Home size={16} />, path: "/" },
    { 
      label: "Carpark", 
      icon: <Car size={16} />, 
      children: [
        { label: "Carpark Details", path: "/carpark/carpark-details" }
      ] 
    },
    { 
      label: "Season", 
      icon: <Calendar size={16} />, 
      children: [
        { label: "New", path: "/season/new" },
        { label: "Edit", path: "/season/edit" },
        { label: "Renewal", path: "/season/renewal" },
        { label: "Multi-renewal", path: "/season/multi-renewal" },
        { label: "Change Vehicle", path: "/season/change-vehicle" },
        { label: "Change Vehicle (Schedule)", path: "/season/change-vehicle-schedule" },
        { label: "Terminate", path: "/season/terminate" },
        { label: "Expiring Season", path: "/season/expiring" },
        { label: "Season Groups", path: "/season/groups" },
        { label: "Season Master", path: "/season/master" },
        { label: "Season History", path: "/season/history" }
      ] 
    },
    { 
      label: "Giro", 
      icon: <CreditCard size={16} />, 
      children: [
        { label: "Approve/Reject", path: "/giro/approve-reject" },
        { label: "Renewal", path: "/giro/renewal" },
        { label: "Update DDA List", path: "/giro/update-dda" },
        { label: "View History", path: "/giro/history" }
      ] 
    },
    { 
      label: "Website", 
      icon: <Globe size={16} />, 
      children: [
        { label: "New Account Application", path: "/website/account-app" },
        { label: "New Season Application", path: "/website/season-app" },
        { label: "Payment Report", path: "/website/payment-report" }
      ] 
    },
    { 
      label: "Reports", 
      icon: <BarChart3 size={16} />, 
      children: [
        { label: "Revenue Collection", path: "/reports/revenue" },
        { label: "Review Revenue Collection", path: "/reports/review-revenue" },
        { label: "HDB Report", path: "/reports/hdb" },
        { label: "Mapletree Report", path: "/reports/mapletree" },
        { label: "New Season Report", path: "/reports/new-season" },
        { label: "Season Allocation", path: "/reports/allocation" },
        { label: "Season Refund", path: "/reports/refund" },
        { label: "Yearly Breakdown", path: "/reports/yearly-breakdown" },
        { label: "Holder Type History", path: "/reports/holder-history" },
        { label: "Vehicle History", path: "/reports/vehicle-history" }
      ] 
    },
    { 
      label: "Tasks", 
      icon: <ClipboardList size={16} />, 
      children: [
        { label: "Complimentary Ticket", path: "/tasks/comp-ticket" },
        { label: "Reprint Receipt", path: "/tasks/reprint" },
        { label: "Create Refund Form", path: "/tasks/refund-form" },
        { label: "Create Application Form", path: "/tasks/app-form" },
        { label: "Print T&Cs", path: "/tasks/terms" }
      ] 
    },
    { 
      label: "System", 
      icon: <Settings size={16} />, 
      children: [
        { label: "Run Jobs (Auto)", path: "/system/jobs" },
        { label: "Auto Login", path: "/system/autologin" },
        { label: "Admin Functions", path: "/system/admin" },
        { label: "Manage Carpark", path: "/system/manage-carpark" },
        { label: "Manage Users", path: "/system/manage-users" },
        { label: "Add User", path: "/system/add-user" },
        { label: "Windows Startup", path: "/system/startup" }
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
                      {item.children.map((child, cIdx) => {
                        const isChildActive = location.pathname === child.path;
                        return (
                          <Link 
                            key={cIdx}
                            to={child.path}
                            onClick={() => setActiveMenu(null)}
                            className={`group flex items-center justify-between w-full text-left px-4 py-2.5 text-[12px] rounded-xl transition-all font-medium
                              ${isChildActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                : 'text-slate-300 hover:text-white hover:bg-blue-600/20'}
                            `}
                          >
                            <span className="truncate">{child.label}</span>
                            <div className={`w-1.5 h-1.5 rounded-full transition-all shadow-[0_0_8px_#60a5fa] 
                              ${isChildActive ? 'bg-white scale-125' : 'bg-blue-400 opacity-0 group-hover:opacity-100'}
                            `} />
                          </Link>
                        );
                      })}
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