import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, RotateCcw, Building2, Save, 
  Hash, Trash2, CheckCircle2, AlertCircle 
} from "lucide-react";

const UpdateDDAList = () => {
  const [carpark, setCarpark] = useState("");
  const [data, setData] = useState([
    { id: 1, itemNo: "ITM-001", accountName: "Tan Ah Teck", ddaRef: "DDA88219", months: 3, status: "Active" },
    { id: 2, itemNo: "ITM-002", accountName: "Siti Aminah", ddaRef: "DDA44567", months: 6, status: "Pending" },
    { id: 3, itemNo: "ITM-003", accountName: "Ramasamy", ddaRef: "DDA11200", months: 12, status: "Active" },
  ]);

  const handleUpdate = (id, field, value) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // --- DELETE LOGIC ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this record?")) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    console.log("Saving Data:", data);
    alert("DDA List Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32 font-poppins text-slate-900">
      <main className="max-w-[1300px] mx-auto">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-black tracking-tight italic uppercase">
            Update <span className="text-blue-600">DDA List</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Modify or remove Direct Debit Authorisation references.</p>
        </header>

        {/* --- SEARCH BAR --- */}
        <section className="bg-white border-2 border-blue-100 rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 mb-8 flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[300px] space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <Building2 size={14} className="text-blue-500" /> Select Carpark
            </label>
            <select 
              value={carpark}
              onChange={(e) => setCarpark(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none transition-all"
            >
              <option value="">All Carparks</option>
              <option value="AMK">Ang Mo Kio Ave 3</option>
              <option value="JW">Jurong West St 42</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all">
              <Search size={16} /> Search
            </button>
            <button 
              onClick={() => setCarpark("")}
              className="flex items-center gap-2 px-8 py-3 bg-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300 transition-colors"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </section>

        {/* --- DDA TABLE --- */}
        <section className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl mb-32">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item No</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">DDA Reference</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Months</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {data.map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <span className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status === 'Active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-400">{item.itemNo}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-800">{item.accountName}</td>
                    <td className="px-8 py-5">
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input 
                          type="text" 
                          value={item.ddaRef}
                          onChange={(e) => handleUpdate(item.id, 'ddaRef', e.target.value)}
                          className="bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-xl pl-9 pr-4 py-2 text-sm font-mono font-bold outline-none transition-all w-full"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <input 
                        type="number" 
                        value={item.months}
                        onChange={(e) => handleUpdate(item.id, 'months', parseInt(e.target.value))}
                        className="w-20 mx-auto block bg-slate-50 border-2 border-transparent focus:border-blue-400 rounded-xl px-3 py-2 text-sm font-black text-center outline-none transition-all"
                      />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item.id)}
                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </section>

        {/* --- BOTTOM SAVE BAR --- */}
        <motion.section 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-0 right-0 mx-auto w-[calc(100%-4rem)] max-w-[1300px] z-[60] bg-slate-900 text-white rounded-[2.5rem] p-6 shadow-2xl flex items-center justify-between border border-slate-700"
        >
          <div className="flex items-center gap-4 ml-4">
            <div className="text-blue-400">
              <Save size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Table Summary</p>
              <p className="text-sm font-bold italic">{data.length} Total Records Found</p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-3 px-12 py-4 bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/40 transition-all"
          >
            Save All Changes
          </motion.button>
        </motion.section>

      </main>
    </div>
  );
};

export default UpdateDDAList;