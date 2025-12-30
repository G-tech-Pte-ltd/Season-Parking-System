import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react"; // Imported Search icon for the empty state
import Typewriter from "./Effects/Typewriter";

const formFields = [
  { label: "Carpark", name: "carpark", type: "select", options: ["CP1", "CP2"] },
  { label: "Holder Type", name: "holderType", type: "select", options: ["Season", "Hourly"] },
  { label: "Rate", name: "rate", type: "number" },
  { label: "Valid From", name: "validFrom", type: "date" },
  { label: "Valid To", name: "validTo", type: "date" },
  { label: "Amount", name: "amount", type: "number" },
];

const HomePage = ({ user }) => {
  const { name, level, lastLogin } = user;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    carpark: "", holderType: "", rate: "", validFrom: "", validTo: "", amount: "",
  });

  const handleSearch = () => {
    if (!search) return;
    setResults([
      { vehicle: search, holder: "John Doe", carpark: "CP1", validTo: "31 Dec 2025" },
      { vehicle: search + "A", holder: "Jane Smith", carpark: "CP2", validTo: "31 Jan 2026" },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    /* BACKGROUND FILL: Changed to 'min-h-screen w-full' and ensured it starts 
       from the very top, using pt-32 to account for your fixed navbar.
    */
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 p-8 pt-32 font-poppins relative overflow-x-hidden">
      
      {/* Decorative soft blue/cyan blobs */}
      <div className="absolute top-[-5%] left-[-2%] w-[45%] h-[45%] bg-blue-100/60 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[2%] right-[-2%] w-[35%] h-[35%] bg-sky-100/50 rounded-full blur-[100px] -z-10" />

      {/* Header Section */}
      <header className="flex justify-between items-center mb-10 relative z-10 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Typewriter
            text={`ACCESS_GRANTED: ${name.toUpperCase()}`}
            speed={50}
            className="text-xl font-mono text-blue-600 tracking-widest font-bold"
          />
          <div className="flex gap-4 mt-2 text-xs uppercase tracking-tighter text-slate-400 font-bold">
            <span>Security Level: <span className="text-blue-500">{level}</span></span>
            <span>Last Access: <span className="text-slate-500">{lastLogin}</span></span>
          </div>
        </motion.div>
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-sky-400 border-2 border-white shadow-lg shadow-blue-100" />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 max-w-[1600px] mx-auto">
        
        {/* Left Column: Season Inquiry Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 bg-white/90 backdrop-blur-xl border-2 border-blue-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5"
        >
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800">
            <span className="h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
            Season Inquiry
          </h2>
          
          <div className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-4 py-3 text-sm focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  >
                    <option value="">Select Option...</option>
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-4 py-3 text-sm focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                )}
              </div>
            ))}

            {/* BUTTON: Green to Blue Hover */}
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "#2563eb", // blue-600
                boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl mt-4 shadow-lg shadow-emerald-200 transition-all uppercase tracking-widest text-xs"
            >
              Submit Application
            </motion.button>
          </div>
        </motion.section>

        {/* Right Column: Search & Results */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-blue-100 shadow-xl shadow-blue-900/5 p-2 rounded-2xl flex gap-2"
          >
            <input
              type="text"
              placeholder="Enter Vehicle Plate Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-6 py-3 text-lg outline-none placeholder:text-slate-300 text-slate-700 font-medium"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
            >
              Search
            </button>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
              {results.map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-2 border-blue-50 p-7 rounded-[2rem] hover:border-blue-300 transition-all shadow-sm group hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                      {res.vehicle}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full uppercase font-black tracking-widest">
                      Active
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Holder Name</span>
                      <span className="text-sm text-slate-700 font-bold">{res.holder}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Location</span>
                      <span className="text-sm text-slate-700 font-bold">{res.carpark}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Valid Until</span>
                      <span className="text-sm text-blue-600 font-black">{res.validTo}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {results.length === 0 && (
            <div className="flex-1 border-2 border-dashed border-blue-100 bg-blue-50/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-blue-300 min-h-[400px]">
              <div className="p-4 bg-white rounded-full shadow-sm border border-blue-50">
                 <Search size={32} className="opacity-20" />
              </div>
              <p className="uppercase tracking-[0.4em] font-bold text-[10px]">Awaiting Data Input</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;