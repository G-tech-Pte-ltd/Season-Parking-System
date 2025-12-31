import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Car, ArrowRight, ShieldCheck, 
  AlertCircle, Save, Info, Cpu, User
} from "lucide-react";

const ChangeVehiclePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecord, setActiveRecord] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New Vehicle State
  const [newVehicle, setNewVehicle] = useState({
    plateNo: "",
    iuNo: "",
    type: "Car",
    effectiveDate: new Date().toISOString().split('T')[0]
  });

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      // Mock result
      setActiveRecord({
        seasonNo: "S-1001",
        currentPlate: "SGA1234A",
        currentIU: "1234567890",
        holderName: "John Doe",
        carpark: "Ang Mo Kio Central",
        expiryDate: "2025-12-31"
      });
      setIsSearching(false);
    }, 800);
  };

  const handleTransfer = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert(`Transfer Successful! Season ${activeRecord.seasonNo} moved to ${newVehicle.plateNo}`);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins relative">
      <main className="max-w-[1200px] mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Vehicle Transfer</h1>
          <p className="text-slate-500">Transfer season parking rights from an old vehicle to a new one.</p>
          
          <div className="relative max-w-xl mt-6">
            <input 
              type="text" 
              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 font-bold outline-none focus:border-blue-500 shadow-lg shadow-blue-900/5"
              placeholder="Search Plate or Season No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase">
              {isSearching ? "Searching..." : "Fetch"}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {activeRecord && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* CURRENT VEHICLE (FROM) */}
              <div className="lg:col-span-5">
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Car size={120} />
                  </div>
                  
                  <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6">Current Registered Vehicle</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Plate Number</label>
                      <p className="text-3xl font-black text-slate-800 font-mono tracking-tighter">{activeRecord.currentPlate}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">IU Number</label>
                        <p className="font-bold text-slate-600 flex items-center gap-2"><Cpu size={14}/> {activeRecord.currentIU}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Holder</label>
                        <p className="font-bold text-slate-600 flex items-center gap-2"><User size={14}/> {activeRecord.holderName}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Season ID:</span>
                        <span className="font-bold text-slate-700">{activeRecord.seasonNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center lg:rotate-0 rotate-90">
                    <div className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/40">
                        <ArrowRight size={32} />
                    </div>
                </div>
              </div>

              {/* NEW VEHICLE (TO) */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8">New Vehicle Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">New Plate Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SNB9999Z"
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white font-mono text-xl focus:border-blue-500 outline-none uppercase"
                        value={newVehicle.plateNo}
                        onChange={(e) => setNewVehicle({...newVehicle, plateNo: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">New IU Number</label>
                      <input 
                        type="text" 
                        placeholder="10 digits..."
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white font-mono text-xl focus:border-blue-500 outline-none"
                        value={newVehicle.iuNo}
                        onChange={(e) => setNewVehicle({...newVehicle, iuNo: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Vehicle Type</label>
                      <select 
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-blue-500 appearance-none"
                        value={newVehicle.type}
                        onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                      >
                        <option>Car</option>
                        <option>Motorcycle</option>
                        <option>Heavy Vehicle</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Effective Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
                        value={newVehicle.effectiveDate}
                        onChange={(e) => setNewVehicle({...newVehicle, effectiveDate: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* LOGIC CHECKER */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 mb-10">
                    <div className="flex gap-4">
                      <ShieldCheck className="text-blue-400 shrink-0" size={24} />
                      <div>
                        <p className="text-sm font-bold text-blue-100">Validation Check</p>
                        <p className="text-xs text-blue-300/80 leading-relaxed mt-1">
                          The system will verify the new IU number with the central gantry database upon submission. 
                          Old vehicle IU access will be revoked immediately on the effective date.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleTransfer}
                    disabled={!newVehicle.plateNo || !newVehicle.iuNo}
                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                        ${!newVehicle.plateNo || !newVehicle.iuNo 
                          ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20"}
                    `}
                  >
                    {isSaving ? "Processing Transfer..." : <><Save size={18}/> Process Vehicle Transfer</>}
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {!activeRecord && (
          <div className="text-center py-24 opacity-20">
            <Car size={80} className="mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">Find a season to transfer</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChangeVehiclePage;