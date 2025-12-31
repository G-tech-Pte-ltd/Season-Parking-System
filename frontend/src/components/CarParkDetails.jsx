import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, RotateCcw, Building2, UserCog, ShieldCheck, User, Download, Plus, Pencil, Trash2, X } from "lucide-react";
import * as XLSX from 'xlsx';

const CarparkDetails = () => {
  // --- STATE MANAGEMENT ---
  const [filters, setFilters] = useState({ query: "", owner: "", admin: "", operations: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: "", carpark: "", owner: "", totalLots: 0, carLots: 0, motorcycleLots: 0,
    heavyVehicleLots: 0, loadingBayLots: 0, totalUnits: 0, adminIncharge: "", osIncharge: "",
  });

  const [data, setData] = useState([
    { 
      id: "CP001", carpark: "Central Plaza", owner: "HDB", totalLots: 500, carLots: 400, 
      motorcycleLots: 80, heavyVehicleLots: 10, loadingBayLots: 10, totalUnits: 450, 
      adminIncharge: "Elliott", osIncharge: "Ops East Team", updatedBy: "Admin_01", 
      timestamp: "24 Dec 2025, 10:20 AM" 
    }
  ]);

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchTerm = filters.query.toLowerCase();
      const matchesSearch = 
        item.carpark.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm) ||
        item.owner.toLowerCase().includes(searchTerm) ||
        item.adminIncharge.toLowerCase().includes(searchTerm);

      const matchesOwner = filters.owner === "" || item.owner === filters.owner;
      const matchesAdmin = filters.admin === "" || item.adminIncharge === filters.admin;
      const matchesOps = filters.operations === "" || item.osIncharge.toLowerCase().includes(filters.operations.toLowerCase());

      return matchesSearch && matchesOwner && matchesAdmin && matchesOps;
    });
  }, [data, filters]);

  // --- CRUD FUNCTIONS ---
  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ 
        id: `CP${Math.floor(100 + Math.random() * 900)}`, 
        carpark: "", owner: "", totalLots: 0, carLots: 0, motorcycleLots: 0, 
        heavyVehicleLots: 0, loadingBayLots: 0, totalUnits: 0, adminIncharge: "", osIncharge: "" 
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const finalEntry = { 
      ...formData, 
      updatedBy: "Elliott", 
      timestamp: new Date().toLocaleString('en-SG', { dateStyle: 'medium', timeStyle: 'short' }) 
    };
    if (editingId) {
      setData(data.map(item => item.id === editingId ? finalEntry : item));
    } else {
      setData([finalEntry, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this record?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Carpark_Details");
    XLSX.writeFile(workbook, `Carpark_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const handleReset = () => setFilters({ query: "", owner: "", admin: "", operations: "" });

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 p-8 pt-32 font-poppins relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-2%] w-[45%] h-[45%] bg-blue-100/60 rounded-full blur-[120px] -z-10" />
      
      <main className="max-w-[1600px] mx-auto relative z-10">
        <header className="mb-8 flex justify-between items-end">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Carpark Details</h1>
            <p className="text-slate-500 font-medium">Global search and allocation management.</p>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 uppercase tracking-widest text-xs"
          >
            <Plus size={18}/> New Entry
          </motion.button>
        </header>

        {/* Search & Filter Action Bar */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl border-2 border-blue-100 rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Typing Search */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Search size={14} className="text-blue-500" /> 1. Global Search
              </label>
              <input 
                type="text" placeholder="Search ID, Carpark, etc..."
                value={filters.query}
                onChange={(e) => setFilters({...filters, query: e.target.value})}
                className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-5 py-3 text-sm focus:border-blue-400 outline-none transition-all"
              />
            </div>

            {/* Owner Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Building2 size={14} className="text-blue-500" /> 2. Owner
              </label>
              <select value={filters.owner} onChange={(e) => setFilters({...filters, owner: e.target.value})} className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-4 py-3 text-sm outline-none cursor-pointer">
                <option value="">All Owners</option>
                <option value="HDB">HDB</option>
                <option value="Mapletree">Mapletree</option>
              </select>
            </div>

            {/* Admin Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <ShieldCheck size={14} className="text-blue-500" /> 3. Admin
              </label>
              <select value={filters.admin} onChange={(e) => setFilters({...filters, admin: e.target.value})} className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-4 py-3 text-sm outline-none cursor-pointer">
                <option value="">All Admins</option>
                <option value="Elliott">Elliott</option>
                <option value="Sarah">Sarah</option>
              </select>
            </div>

            {/* Ops Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <UserCog size={14} className="text-blue-500" /> 4. Operations
              </label>
              <select value={filters.operations} onChange={(e) => setFilters({...filters, operations: e.target.value})} className="w-full bg-slate-50 border-2 border-blue-50 rounded-2xl px-4 py-3 text-sm outline-none cursor-pointer">
                <option value="">All Regions</option>
                <option value="East">Ops East</option>
                <option value="West">Ops West</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="flex gap-4">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-emerald-100">Apply Search</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleReset} className="bg-white border-2 border-slate-200 text-slate-500 px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2"><RotateCcw size={16}/> Reset</motion.button>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={exportToExcel} className="bg-slate-100 text-slate-600 px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] border border-slate-200 flex items-center gap-2"><Download size={14}/> Export XLSX</motion.button>
          </div>
        </motion.section>

        {/* Animated Table */}
        <motion.section 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white border-2 border-blue-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[2200px]">
              <thead>
                <tr className="bg-slate-50 border-b border-blue-100">
                  <th className="sticky left-0 bg-slate-50 px-6 py-5 text-[10px] font-black text-slate-400 uppercase z-20 border-r border-blue-50">Carpark</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Owner</th>
                  <th className="px-6 py-5 text-[10px] font-black text-blue-500 bg-blue-50/30 uppercase">Total Lots</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Car</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Motor</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Heavy</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Loading</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Units</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Admin</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">OS</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase">Updated</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50/20 transition-colors group"
                    >
                      <td className="sticky left-0 bg-white group-hover:bg-blue-50/50 px-6 py-5 border-r border-blue-50 z-10 font-black text-slate-800 text-sm">
                        {item.carpark} <br/><span className="text-[10px] font-mono text-blue-500">{item.id}</span>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600">{item.owner}</td>
                      <td className="px-6 py-5 text-sm font-black text-blue-600 bg-blue-50/10">{item.totalLots}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.carLots}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.motorcycleLots}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.heavyVehicleLots}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.loadingBayLots}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.totalUnits}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-700">{item.adminIncharge}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{item.osIncharge}</td>
                      <td className="px-6 py-5 text-[10px] text-slate-400 font-mono">
                        <User size={10} className="inline mr-1"/>{item.updatedBy}<br/>{item.timestamp}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openModal(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={16}/></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      {/* Animated Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{editingId ? "Update Carpark" : "Add New Carpark"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">1. Carpark Name</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-blue-400" 
                    value={formData.carpark} onChange={(e) => setFormData({...formData, carpark: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">2. Owner</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-blue-400" 
                    value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})} />
                </div>

                <div className="bg-blue-50/50 p-6 rounded-3xl col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
                   <div className="col-span-full mb-2 font-bold text-blue-600 text-[10px] uppercase tracking-widest">Lot Allocation Metrics</div>
                   {['totalLots', 'carLots', 'motorcycleLots', 'heavyVehicleLots', 'loadingBayLots'].map((field, i) => (
                     <div key={field}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{i+3}. {field.replace('Lots', '')}</label>
                        <input type="number" className="w-full bg-white border border-blue-100 rounded-xl px-3 py-2 mt-1" value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})} />
                     </div>
                   ))}
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">8. Total Units</label>
                  <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 mt-1 outline-none" value={formData.totalUnits} onChange={(e) => setFormData({...formData, totalUnits: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">9. Admin Incharge</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 mt-1 outline-none" value={formData.adminIncharge} onChange={(e) => setFormData({...formData, adminIncharge: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">10. OS Incharge</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 mt-1 outline-none" value={formData.osIncharge} onChange={(e) => setFormData({...formData, osIncharge: e.target.value})} />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex-grow bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-blue-100 transition-all hover:bg-blue-700">Confirm Record</motion.button>
                <button onClick={() => setIsModalOpen(false)} className="px-8 text-slate-400 font-bold uppercase text-xs hover:text-slate-600">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarparkDetails;