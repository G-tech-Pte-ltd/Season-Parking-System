import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, CreditCard, RefreshCw, 
  Clock, ArrowRight, Info, User, Car, Hash, Wallet
} from "lucide-react";

const RenewalSeason = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecord, setActiveRecord] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Date & Pricing States
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const result = {
        id: 1, seasonNo: "S-1001", vehicleNo: "SGA1234A", 
        holderName: "John Doe", currentExpiry: "2025-01-31", 
        monthlyRate: 120, carpark: "Ang Mo Kio Central",
        memberType: "Permanent Resident"
      };
      setActiveRecord(result);
      const nextDay = new Date(result.currentExpiry);
      nextDay.setDate(nextDay.getDate() + 1);
      const fromStr = nextDay.toISOString().split('T')[0];
      setValidFrom(fromStr);
      setValidTo(calculateExpiry(fromStr, 1));
      setIsSearching(false);
    }, 800);
  };

  const calculateExpiry = (startDate, months) => {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + parseInt(months));
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (activeRecord && validFrom && validTo) {
      const start = new Date(validFrom);
      const end = new Date(validTo);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
      
      const dailyRate = activeRecord.monthlyRate / 30;
      setTotalPrice(Math.max(0, dailyRate * diffDays));
    }
  }, [validFrom, validTo, activeRecord]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins relative">
      <main className="max-w-[1200px] mx-auto">
        
        {/* --- SEARCH HEADER --- */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase italic tracking-tight">Season Renewal Portal</h1>
          <div className="relative max-w-xl mx-auto mt-6">
            <input 
              type="text" 
              className="w-full bg-white border-2 border-slate-200 rounded-[2rem] px-8 py-5 font-bold shadow-xl shadow-blue-900/5 outline-none focus:border-blue-500 transition-all text-lg"
              placeholder="Search Vehicle or Season No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
              {isSearching ? "..." : "Fetch"}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {activeRecord && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: Record Context */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl">
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Account Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"><User size={20}/></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Holder Name</p>
                        <p className="font-black text-slate-800">{activeRecord.holderName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"><Car size={20}/></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Vehicle No</p>
                        <p className="font-black text-blue-600 font-mono text-lg">{activeRecord.vehicleNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"><Hash size={20}/></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Season ID</p>
                        <p className="font-black text-slate-800">{activeRecord.seasonNo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                      <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase">
                        <Clock size={14}/> Current Expiry
                      </div>
                      <span className="font-black text-rose-600">{activeRecord.currentExpiry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Action & Billing */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-black uppercase flex items-center gap-3 italic">
                      <Calendar className="text-blue-400" /> Renewal Period
                    </h2>
                    <div className="flex bg-slate-800 p-1.5 rounded-xl gap-1">
                      {[1, 3, 6, 12].map(m => (
                        <button 
                          key={m}
                          onClick={() => setValidTo(calculateExpiry(validFrom, m))}
                          className="px-4 py-2 hover:bg-blue-600 rounded-lg text-[10px] font-black transition-all uppercase"
                        >
                          {m}M
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Effective Date</label>
                      <input type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all cursor-pointer"/>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Expiry Date</label>
                      <input type="date" value={validTo} onChange={(e) => setValidTo(e.target.value)} className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-emerald-500 transition-all cursor-pointer"/>
                    </div>
                  </div>

                  {/* PRO-RATED CALCULATION BREAKDOWN */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Financial Breakdown</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Renewal Duration:</span>
                        <span className="font-bold">{totalDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Daily Pro-rated Rate:</span>
                        <span className="font-bold">${(activeRecord.monthlyRate / 30).toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-white/10">
                        <span className="text-blue-400 font-black uppercase text-xs">Total Amount Due</span>
                        <span className="text-3xl font-black text-white italic">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payment Method</label>
                      <div className="flex gap-2">
                        {['Cash', 'NETS', 'Credit'].map(mode => (
                          <button 
                            key={mode} 
                            onClick={() => setPaymentMode(mode)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${paymentMode === mode ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 transition-all text-white">
                      <Wallet size={18}/> Confirm & Pay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RenewalSeason;