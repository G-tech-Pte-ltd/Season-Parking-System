import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Trash2, AlertTriangle, Landmark, 
  Calendar, User, Car, Info, ChevronRight
} from "lucide-react";

const TerminateSeasonPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecord, setActiveRecord] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Termination States
  const [terminationDate, setTerminationDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState("");
  const [refundAmount, setRefundAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const result = {
        id: 1, seasonNo: "S-1001", vehicleNo: "SGA1234A", 
        holderName: "John Doe", currentExpiry: "2026-12-31", 
        monthlyRate: 150, carpark: "Ang Mo Kio Central"
      };
      setActiveRecord(result);
      setIsSearching(false);
    }, 800);
  };

  // Logic: Calculate refund based on remaining full months + pro-rated current month
  useEffect(() => {
    if (activeRecord && terminationDate) {
      const end = new Date(activeRecord.currentExpiry);
      const term = new Date(terminationDate);
      
      if (term < end) {
        const diffTime = end - term;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const dailyRate = activeRecord.monthlyRate / 30;
        setRefundAmount(Math.max(0, dailyRate * diffDays));
      } else {
        setRefundAmount(0);
      }
    }
  }, [terminationDate, activeRecord]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins relative">
      <main className="max-w-[1100px] mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl"><Trash2 size={24}/></div>
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Terminate Season</h1>
          </div>
          <p className="text-slate-500">Calculate final refunds and revoke parking access permissions.</p>
          
          <div className="relative max-w-xl mt-6">
            <input 
              type="text" 
              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 font-bold outline-none focus:border-rose-400 shadow-xl shadow-rose-900/5"
              placeholder="Search Plate or Season No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-2 top-2 bg-rose-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest">
              {isSearching ? "..." : "Fetch"}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {activeRecord && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT: SUMMARY */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Record</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-slate-400"/>
                      <span className="font-bold text-slate-700">{activeRecord.holderName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car size={16} className="text-slate-400"/>
                      <span className="font-mono font-bold text-blue-600">{activeRecord.vehicleNo}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-slate-400"/>
                      <span className="font-bold text-slate-700">Expires: {activeRecord.currentExpiry}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-3">
                    <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-1"/>
                    <p className="text-[11px] text-rose-700 leading-relaxed font-medium">
                      Termination is irreversible. Access will be cut off at 23:59 on the selected date.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: TERMINATION FORM */}
              <div className="lg:col-span-8 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Effective Termination Date</label>
                    <input 
                      type="date" 
                      value={terminationDate}
                      onChange={(e) => setTerminationDate(e.target.value)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Reason for Cancellation</label>
                    <select 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-rose-500 appearance-none"
                    >
                      <option value="">Select a reason...</option>
                      <option>Vehicle Sold / Scrap</option>
                      <option>Relocation</option>
                      <option>Switch to Public Transport</option>
                      <option>Season Expired (No Renewal)</option>
                    </select>
                  </div>
                </div>

                {/* REFUND CALCULATOR PANEL */}
                <div className="bg-rose-500/10 border-2 border-rose-500/20 rounded-[2rem] p-8 mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-widest">
                      <Landmark size={14}/> Estimated Refund
                    </div>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full font-bold">Pro-rated</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <h2 className="text-5xl font-black text-white italic tracking-tighter">
                      ${refundAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                    <div className="text-right text-[11px] text-slate-500">
                      <p>Refund Policy: Daily rate basis</p>
                      <p>Processing time: 3-5 working days</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                    Cancel Action
                  </button>
                  <button 
                    disabled={!reason}
                    className={`flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                      ${!reason ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/30'}
                    `}
                  >
                    Confirm Termination <ChevronRight size={16}/>
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {!activeRecord && (
          <div className="text-center py-24 opacity-20">
            <AlertTriangle size={80} className="mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">Enter details to initiate termination</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TerminateSeasonPage;