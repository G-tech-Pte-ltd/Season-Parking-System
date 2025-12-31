import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  Download, 
  Filter, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  Search
} from "lucide-react";
import * as XLSX from 'xlsx';

const SeasonHistory = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchQuery, setSearchQuery] = useState("");

  // --- MOCK DATA ---
  const historyData = [
    { id: "H001", month: "December", carpark: "Central Plaza", totalRevenue: 12500, occupancy: 92, growth: +5.2, status: "Peak" },
    { id: "H002", month: "November", carpark: "North Gate", totalRevenue: 8400, occupancy: 78, growth: -1.4, status: "Stable" },
    { id: "H003", month: "October", carpark: "East Wing", totalRevenue: 15200, occupancy: 98, growth: +12.8, status: "Peak" },
    { id: "H004", month: "September", carpark: "Central Plaza", totalRevenue: 11000, occupancy: 85, growth: +2.1, status: "Stable" },
  ];

  const filteredHistory = useMemo(() => {
    return historyData.filter(item => 
      item.carpark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.month.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const exportHistory = () => {
    const ws = XLSX.utils.json_to_sheet(filteredHistory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");
    XLSX.writeFile(wb, `Season_History_${selectedYear}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32 font-poppins">
      <main className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <History size={20} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Archive & Analytics</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 italic uppercase">Season History</h1>
          </motion.div>

          <div className="flex gap-4">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border-2 border-slate-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="2025">Year 2025</option>
              <option value="2024">Year 2024</option>
              <option value="2023">Year 2023</option>
            </select>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              onClick={exportHistory}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Download size={16} /> Export Data
            </motion.button>
          </div>
        </header>

        {/* --- Quick Metrics --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Annual Revenue", value: "$452,000", trend: "+12%", icon: TrendingUp, color: "text-emerald-500" },
            { label: "Avg. Occupancy", value: "84.5%", trend: "+3.2%", icon: Calendar, color: "text-blue-500" },
            { label: "Top Carpark", value: "East Wing", trend: "High Demand", icon: ArrowUpRight, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md bg-slate-50 ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* --- Search & Filter Bar --- */}
        <section className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search month or carpark name..."
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-6 py-3 text-sm focus:ring-2 ring-blue-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </section>

        {/* --- History Table --- */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Carpark</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Occupancy</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">YoY Growth</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {filteredHistory.map((row, idx) => (
                    <motion.tr 
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-blue-50/20 transition-colors group"
                    >
                      <td className="px-8 py-6 font-bold text-slate-900">{row.month} {selectedYear}</td>
                      <td className="px-8 py-6 font-medium text-slate-600">{row.carpark}</td>
                      <td className="px-8 py-6 font-black text-slate-800">${row.totalRevenue.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${row.occupancy}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-500">{row.occupancy}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center gap-1 text-xs font-bold ${row.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {row.growth >= 0 ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                          {Math.abs(row.growth)}%
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          row.status === "Peak" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SeasonHistory;