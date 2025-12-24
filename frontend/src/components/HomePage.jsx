import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-[#030712] text-slate-200 p-8 font-poppins bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Typewriter
            text={`SYSTEM_ACCESS: ${name.toUpperCase()}`}
            speed={50}
            className="text-xl font-mono text-purple-400 tracking-widest"
          />
          <div className="flex gap-4 mt-2 text-xs uppercase tracking-tighter text-slate-500">
            <span>Level: <span className="text-white">{level}</span></span>
            <span>Last Login: <span className="text-white">{lastLogin}</span></span>
          </div>
        </motion.div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 border-2 border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Season Inquiry Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
            Season Inquiry
          </h2>
          
          <div className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="text-xs font-semibold text-slate-400 uppercase ml-1 mb-1 block">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl mt-4 shadow-lg shadow-purple-900/20"
            >
              Submit Application
            </motion.button>
          </div>
        </motion.section>

        {/* Right Column: Search & Results */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/40 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex gap-2"
          >
            <input
              type="text"
              placeholder="Search Vehicle Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-6 py-3 text-lg outline-none placeholder:text-slate-600"
            />
            <button
              onClick={handleSearch}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-purple-400 transition-colors"
            >
              Search
            </button>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {results.map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 p-5 rounded-2xl hover:border-purple-500/50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                      {res.vehicle}
                    </span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md uppercase font-bold">
                      Active
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Holder</span>
                      <span className="text-white">{res.holder}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Carpark</span>
                      <span className="text-white">{res.carpark}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expiry</span>
                      <span className="text-purple-400">{res.validTo}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {results.length === 0 && (
            <div className="flex-1 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center text-slate-600 uppercase tracking-widest text-sm">
              Waiting for Input...
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;