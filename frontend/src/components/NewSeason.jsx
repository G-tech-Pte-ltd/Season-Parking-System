import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, User, MapPin, CreditCard, 
  Trash2, Save, Car, Calendar, 
  ChevronDown, CheckCircle2, RotateCcw
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const SeasonMasterForm = () => {
  const initialState = {
    carpark: "", seasonNo: "", multiSeason: false, seasonType: "",
    period: "", holderType: "", rate: "", zone: [], insuranceExpiry: "",
    vehicleNo: "", holderName: "", company: "", contactNo: "", email: "", remarks: "",
    block: "", streetName: "", unitLevel: "", unitNumber: "", buildingName: "", postalCode: "",
    validFrom: "", validTo: "", initialAmount: 0, vpcDeposit: 0, 
    adminCharge: 0, totalAmount: 0, paymentMode: "", chequeNo: "", 
    datePaid: "", ddaReference: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const total = Number(formData.initialAmount) + Number(formData.vpcDeposit) + Number(formData.adminCharge);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  }, [formData.initialAmount, formData.vpcDeposit, formData.adminCharge]);

  const handleClear = () => {
    setFormData(initialState);
  };

  const toggleZone = (zoneName) => {
    setFormData(prev => ({
      ...prev,
      zone: prev.zone.includes(zoneName) 
        ? prev.zone.filter(z => z !== zoneName) 
        : [...prev.zone, zoneName]
    }));
  };

  const inputClass = "w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:bg-white transition-all";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block";

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-28 font-poppins relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto"
      >
        <header className="flex justify-between items-end mb-12">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">SEASON PORTAL</h1>
            <p className="text-slate-500 font-medium">Create and allocate new season permits with automated billing.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <RotateCcw size={16}/> Clear All
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              <Save size={16}/> Save Season
            </motion.button>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SECTION 1: SEASON */}
          <motion.section variants={itemVariants} className="bg-white border-2 border-blue-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
              <FileText className="text-blue-600" size={24}/>
              <h2 className="font-black text-slate-800 uppercase text-lg">Season Details</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className={labelClass}>Carpark</label>
                <select className={inputClass} value={formData.carpark} onChange={e => setFormData({...formData, carpark: e.target.value})}>
                  <option value="">Select Carpark...</option>
                  <option value="HDB_AMK">Ang Mo Kio Central</option>
                  <option value="MAPLE_B">Mapletree Business City</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <label className={labelClass}>Season No</label>
                <input type="text" className={inputClass} placeholder="S-0000" />
              </div>

              <div className="flex items-center gap-3 bg-blue-50/50 px-4 rounded-xl">
                 <input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" />
                 <span className="text-[10px] font-black text-blue-900 uppercase">Multi-Season</span>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Season Type</label>
                  <select className={inputClass}><option>Monthly</option><option>Annual</option></select>
                </div>
                <div>
                  <label className={labelClass}>Period</label>
                  <select className={inputClass}><option>1 Month</option><option>12 Months</option></select>
                </div>
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Zone (No selection = All)</label>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  {['Main', 'Basement', 'Loading'].map(z => (
                    <motion.label key={z} whileHover={{ x: 2 }} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                      <span className="text-xs font-bold text-slate-600">{z}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Insurance Expiry</label>
                <input type="date" className={inputClass} />
              </div>
            </div>
          </motion.section>

          {/* SECTION 2: CUSTOMER */}
          <motion.section variants={itemVariants} className="bg-white border-2 border-blue-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
              <User className="text-emerald-600" size={24}/>
              <h2 className="font-black text-slate-800 uppercase text-lg">Customer Info</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className={labelClass}>Vehicle Number</label>
                <input type="text" className={`${inputClass} font-mono text-lg font-black uppercase text-blue-600 placeholder:opacity-30`} placeholder="SGA 1234 A" />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Holder Name</label>
                <input type="text" className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className={labelClass}>Contact No</label>
                <input type="tel" className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Remarks</label>
                <textarea className={inputClass} rows="3" />
              </div>
            </div>
          </motion.section>

          {/* SECTION 3: ADDRESS */}
          <motion.section variants={itemVariants} className="bg-white border-2 border-blue-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
              <MapPin className="text-orange-500" size={24}/>
              <h2 className="font-black text-slate-800 uppercase text-lg">Address Details</h2>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div><label className={labelClass}>Block</label><input type="text" className={inputClass} /></div>
              <div className="col-span-3"><label className={labelClass}>Street</label><input type="text" className={inputClass} /></div>
              <div className="col-span-2"><label className={labelClass}>Unit Level</label><input type="text" className={inputClass} /></div>
              <div className="col-span-2"><label className={labelClass}>Unit Number</label><input type="text" className={inputClass} /></div>
              <div className="col-span-4"><label className={labelClass}>Building Name</label><input type="text" className={inputClass} /></div>
              <div className="col-span-4"><label className={labelClass}>Postal Code</label><input type="text" className={inputClass} /></div>
            </div>
          </motion.section>

          {/* SECTION 4: PAYMENT */}
          <motion.section 
            variants={itemVariants}
            layout
            className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/20 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
              <CreditCard className="text-blue-400" size={24}/>
              <h2 className="font-black text-white uppercase text-lg">Payment & Billing</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div><label className="text-[10px] font-black text-slate-500 uppercase mb-1">Valid From</label><input type="date" className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-2 text-white outline-none" /></div>
              <div><label className="text-[10px] font-black text-slate-500 uppercase mb-1">Valid To</label><input type="date" className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-2 text-white outline-none" /></div>
              
              <div className="col-span-2 grid grid-cols-3 gap-3 bg-black/30 p-4 rounded-2xl">
                <div><label className="text-[8px] font-bold text-slate-500 uppercase">Initial</label><input type="number" className="w-full bg-transparent border-b border-slate-700 text-blue-400 font-bold outline-none" onChange={e => setFormData({...formData, initialAmount: e.target.value})} /></div>
                <div><label className="text-[8px] font-bold text-slate-500 uppercase">Deposit</label><input type="number" className="w-full bg-transparent border-b border-slate-700 text-blue-400 font-bold outline-none" onChange={e => setFormData({...formData, vpcDeposit: e.target.value})} /></div>
                <div><label className="text-[8px] font-bold text-slate-500 uppercase">Admin</label><input type="number" className="w-full bg-transparent border-b border-slate-700 text-blue-400 font-bold outline-none" onChange={e => setFormData({...formData, adminCharge: e.target.value})} /></div>
              </div>

              <div className="col-span-2 flex justify-between items-center bg-blue-600 p-5 rounded-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Total Due</div>
                <motion.div 
                  key={formData.totalAmount}
                  initial={{ scale: 1.1, color: "#fff" }}
                  animate={{ scale: 1, color: "#fff" }}
                  className="text-3xl font-black"
                >
                  ${formData.totalAmount.toFixed(2)}
                </motion.div>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase mb-1">Payment Mode</label>
                <select 
                  className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                  value={formData.paymentMode}
                  onChange={e => setFormData({...formData, paymentMode: e.target.value})}
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="DDA">DDA (Direct Debit)</option>
                </select>
              </div>

              <AnimatePresence>
                {formData.paymentMode === "Cheque" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="col-span-2"
                  >
                    <label className="text-[10px] font-black text-slate-500 uppercase mb-1">Cheque Number</label>
                    <input type="text" className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-2 text-white outline-none" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
};

export default SeasonMasterForm;