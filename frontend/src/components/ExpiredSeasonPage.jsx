import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, AlertCircle, RefreshCcw, 
  ArrowRight, Mail, Phone, ExternalLink, Clock
} from "lucide-react";

const ExpiringSoonPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ count: 0, revenueAtRisk: 0 });

  // 1. Logic to get "Current Month" range
  const getMonthRange = () => {
    const now = new Date();
    const firstDay = now.toISOString().split('T')[0]; // Today
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    return { firstDay, lastDay };
  };

  const { firstDay, lastDay } = getMonthRange();

  // 2. Automated Fetch for "This Month"
  const fetchExpiringThisMonth = () => {
    setIsSearching(true);
    setTimeout(() => {
      const mockData = [
        { id: 1, seasonNo: "S-2022", vehicleNo: "SGP8888X", holder: "James Tan", expiry: "2025-12-28", rate: 150, phone: "91234567" },
        { id: 2, seasonNo: "S-2045", vehicleNo: "SLK1234Z", holder: "Sarah Lee", expiry: "2025-12-30", rate: 100, phone: "82345678" },
        { id: 3, seasonNo: "S-1988", vehicleNo: "SMN5566A", holder: "Kevin Ang", expiry: "2025-12-31", rate: 120, phone: "98765432" },
      ];
      setRecords(mockData);
      setStats({
        count: mockData.length,
        revenueAtRisk: mockData.reduce((acc, curr) => acc + curr.rate, 0)
      });
      setIsSearching(false);
    }, 800);
  };

  // Initial load
  useEffect(() => {
    fetchExpiringThisMonth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins">
      <main className="max-w-[1200px] mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Expiring This Month</h1>
            </div>
            <p className="text-slate-500 font-medium">
              Showing permits expiring between <span className="text-slate-900 font-bold">{firstDay}</span> and <span className="text-slate-900 font-bold">{lastDay}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase">Total Items</p>
              <p className="text-xl font-black text-amber-600">{stats.count}</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase">Revenue at Risk</p>
              <p className="text-xl font-black text-slate-900">${stats.revenueAtRisk}</p>
            </div>
          </div>
        </header>

        {/* --- ACTIONS BAR --- */}
        <div className="mb-6 flex gap-3">
          <button onClick={fetchExpiringThisMonth} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all">
            <RefreshCcw size={14} className={isSearching ? "animate-spin" : ""} /> Refresh List
          </button>
          <button className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            Send Reminders (SMS)
          </button>
        </div>

        {/* --- RECORDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {records.map((record) => (
              <motion.div 
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="bg-slate-900 text-white px-3 py-1 rounded-lg font-mono text-xs font-bold mb-2 inline-block">
                      {record.vehicleNo}
                    </div>
                    <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight leading-tight">
                      {record.holder}
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <AlertCircle size={20} />
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Expiry Date</span>
                    <span className="text-rose-600 font-black">{record.expiry}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Monthly Rate</span>
                    <span className="text-slate-900 font-black">${record.rate}.00</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-6 border-t border-slate-50">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-600 text-[10px] font-black uppercase hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <Phone size={14} /> Call
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                    Renew <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {records.length === 0 && !isSearching && (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <Calendar size={64} className="mx-auto mb-4 text-slate-200" />
            <p className="font-black text-slate-400 uppercase tracking-widest">All seasons are up to date</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpiringSoonPage;