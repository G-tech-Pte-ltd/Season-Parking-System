import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, FileText, User, MapPin, CreditCard, 
  Save, Car, CheckCircle2, AlertCircle, XCircle, RotateCcw
} from "lucide-react";

const EditSeasonPage = () => {
  // --- MOCK DATA FOR SEARCHING ---
  const mockDatabase = [
    {
      id: 1, seasonNo: "S-1001", vehicleNo: "SGA1234A", carpark: "HDB_AMK", multiSeason: true,
      seasonType: "Monthly", period: "1 Month", holderType: "Residential", rate: 100,
      zone: ["Main"], insuranceExpiry: "2026-12-31", holderName: "John Doe",
      company: "Tech Corp", contactNo: "91234567", email: "john@doe.com", remarks: "VIP",
      block: "123", streetName: "AMK Ave 3", unitLevel: "10", unitNumber: "55",
      buildingName: "Central Hub", postalCode: "560123", validFrom: "2025-01-01",
      validTo: "2025-01-31", initialAmount: 100, vpcDeposit: 50, adminCharge: 10,
      totalAmount: 160, paymentMode: "Cash", chequeNo: "", datePaid: "2025-01-01", ddaReference: ""
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecord, setActiveRecord] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saving, success

  // --- SEARCH FUNCTION ---
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const result = mockDatabase.find(r => 
        r.seasonNo.toLowerCase() === searchQuery.toLowerCase() || 
        r.vehicleNo.toLowerCase() === searchQuery.toLowerCase()
      );
      setActiveRecord(result || null);
      if (!result) alert("No record found.");
      setIsSearching(false);
    }, 800);
  };

  // --- SAVE FUNCTION ---
  const handleUpdate = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1500);
  };

  const inputClass = "w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:bg-white transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block";

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10" />
      
      <main className="max-w-[1400px] mx-auto">
        {/* --- SEARCH HEADER --- */}
        <motion.section 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-2 border-blue-600/20 rounded-[2.5rem] p-8 shadow-xl mb-12"
        >
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Search size={16}/> Search to Edit
            </h2>
            <div className="relative">
                <input 
                type="text" 
                placeholder="Enter Season Number or Vehicle Number (e.g. S-1001)..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold outline-none focus:border-blue-400 transition-all pr-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <motion.button 
                    // Proper Hovering & Interaction States
                    whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "#1d4ed8", // Darker blue
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)" 
                    }} 
                    whileTap={{ scale: 0.98 }}
                    disabled={isSearching || !searchQuery}
                    onClick={handleSearch}
                    className={`
                    flex items-center justify-center min-w-[140px] px-8 py-3 rounded-xl 
                    font-black text-xs uppercase tracking-widest transition-colors
                    ${isSearching || !searchQuery 
                        ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                        : "bg-blue-600 text-white"}
                    `}
                >
                    {isSearching ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mr-2"
                    >
                        <RotateCcw size={14} />
                    </motion.div>
                    ) : null}
                    {isSearching ? "Searching" : "Fetch Record"}
                </motion.button>
                </div>
            </div>
            </div>
        </div>
        </motion.section>

        {/* --- DYNAMIC EDIT FORM --- */}
        <AnimatePresence mode="wait">
          {activeRecord ? (
            <motion.div 
              key={activeRecord.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-blue-50 p-6 rounded-[2rem] border-2 border-blue-100">
                <div>
                  <span className="text-[10px] font-black text-blue-400 uppercase">Currently Editing</span>
                  <h3 className="text-2xl font-black text-slate-800 uppercase italic">{activeRecord.vehicleNo} / {activeRecord.seasonNo}</h3>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleUpdate}
                  className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${
                    saveStatus === "success" ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {saveStatus === "saving" ? "Updating..." : saveStatus === "success" ? <><CheckCircle2/> Saved!</> : <><Save/> Update Record</>}
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Season Details (Populated from activeRecord) */}
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8">
                  <h4 className="font-black text-slate-800 uppercase mb-6 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> Season Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><label className={labelClass}>Carpark</label><select className={inputClass} defaultValue={activeRecord.carpark}><option value="HDB_AMK">Ang Mo Kio Central</option></select></div>
                    <div><label className={labelClass}>Season No</label><input className={inputClass} defaultValue={activeRecord.seasonNo} /></div>
                    <div><label className={labelClass}>Rate ($)</label><input className={inputClass} defaultValue={activeRecord.rate} /></div>
                    <div className="col-span-2 p-4 bg-slate-50 rounded-xl">
                      <label className={labelClass}>Zones</label>
                      <div className="flex gap-4">{['Main', 'Basement', 'Loading'].map(z => <label key={z} className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" defaultChecked={activeRecord.zone.includes(z)} className="accent-blue-600"/> {z}</label>)}</div>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Details */}
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8">
                  <h4 className="font-black text-slate-800 uppercase mb-6 flex items-center gap-2"><User size={18} className="text-emerald-500"/> Customer Info</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><label className={labelClass}>Holder Name</label><input className={inputClass} defaultValue={activeRecord.holderName} /></div>
                    <div className="col-span-2"><label className={labelClass}>Company</label><input className={inputClass} defaultValue={activeRecord.company} /></div>
                    <div><label className={labelClass}>Contact</label><input className={inputClass} defaultValue={activeRecord.contactNo} /></div>
                    <div><label className={labelClass}>Email</label><input className={inputClass} defaultValue={activeRecord.email} /></div>
                  </div>
                </div>

                {/* 3. Address Details */}
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8">
                  <h4 className="font-black text-slate-800 uppercase mb-6 flex items-center gap-2"><MapPin size={18} className="text-orange-500"/> Address</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className={labelClass}>Block</label><input className={inputClass} defaultValue={activeRecord.block} /></div>
                    <div className="col-span-2"><label className={labelClass}>Street</label><input className={inputClass} defaultValue={activeRecord.streetName} /></div>
                    <div className="col-span-3"><label className={labelClass}>Building</label><input className={inputClass} defaultValue={activeRecord.buildingName} /></div>
                  </div>
                </div>

                {/* 4. Payment Details */}
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl">
                  <h4 className="font-black text-white uppercase mb-6 flex items-center gap-2"><CreditCard size={18} className="text-blue-400"/> Financials</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[8px] font-black text-slate-500 uppercase">Valid From</label><input type="date" className="w-full bg-slate-800 border-none rounded-lg p-2 text-white" defaultValue={activeRecord.validFrom} /></div>
                    <div><label className="text-[8px] font-black text-slate-500 uppercase">Valid To</label><input type="date" className="w-full bg-slate-800 border-none rounded-lg p-2 text-white" defaultValue={activeRecord.validTo} /></div>
                    <div className="col-span-2 flex justify-between items-center bg-blue-600 p-4 rounded-xl mt-4">
                      <span className="text-[10px] font-black uppercase">Total Paid</span>
                      <span className="text-2xl font-black">${activeRecord.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-slate-300"
            >
              <Car size={64} className="mb-4 opacity-20" />
              <p className="font-bold text-sm uppercase tracking-[0.3em]">Enter a search query to load season data</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EditSeasonPage;