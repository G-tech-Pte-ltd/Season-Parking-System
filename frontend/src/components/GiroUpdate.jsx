import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Calendar, Hash, Car, CheckCircle, 
  XCircle, FileText, Download, CheckSquare, Square 
} from "lucide-react";
import * as XLSX from 'xlsx';

const GiroUpdate = () => {
  // --- STATE ---
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    carpark: "",
    company: "",
    month: "",
    ddaRef: "",
    vehicleNo: ""
  });

  // --- MOCK DATA ---
  const [data] = useState([
    {
      id: "G001", batchNo: "B-2025-01", status: "Pending", accountName: "Tan Ah Teck",
      ddaReference: "DDA88219", seasonNo: "S-9921", vehicleNo: "SJB1234A",
      type: "Car", company: "HDB", rate: 110, validFrom: "01 Jan 2026",
      validTo: "31 Mar 2026", mos: 3, vpc: "VPC-01", amountDue: 330,
      appliedBy: "Self-Service", appliedOn: "28 Dec 2025", address: "Blk 123 Ang Mo Kio Ave 3"
    },
    {
      id: "G002", batchNo: "B-2025-01", status: "Pending", accountName: "Siti Aminah",
      ddaReference: "DDA44567", seasonNo: "S-8812", vehicleNo: "SLK5678C",
      type: "Car", company: "URA", rate: 150, validFrom: "01 Feb 2026",
      validTo: "30 Apr 2026", mos: 3, vpc: "VPC-05", amountDue: 450,
      appliedBy: "Admin", appliedOn: "02 Jan 2026", address: "Blk 456 Jurong West St 42"
    }
  ]);

  // --- LOGIC ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchCarpark = filters.carpark === "" || item.address.toLowerCase().includes(filters.carpark.toLowerCase());
      const matchCompany = filters.company === "" || item.company === filters.company;
      const matchDda = filters.ddaRef === "" || item.ddaReference.includes(filters.ddaRef);
      const matchVehicle = filters.vehicleNo === "" || item.vehicleNo.toLowerCase().includes(filters.vehicleNo.toLowerCase());
      return matchCarpark && matchCompany && matchDda && matchVehicle;
    });
  }, [data, filters]);

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) setSelectedRows([]);
    else setSelectedRows(filteredData.map(item => item.id));
  };

  const toggleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = (type) => {
    if (selectedRows.length === 0) return alert("Please select records first.");
    alert(`${type} processed for ${selectedRows.length} items.`);
  };

  const exportGiro = (all = false) => {
    const exportData = all ? data : filteredData;
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GIRO_Report");
    XLSX.writeFile(wb, `GIRO_Update_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32 font-poppins text-slate-900 overflow-x-hidden">
      <main className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="mb-10"
        >
          <h1 className="text-4xl font-black tracking-tight italic uppercase">
            GIRO <span className="text-blue-600">Update</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Manage automated payment references and validation status.</p>
        </motion.header>

        {/* Filters Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white border-2 border-blue-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Building2 size={14} className="text-blue-500" /> Carpark
              </label>
              <select 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 transition-all outline-none"
                value={filters.carpark} 
                onChange={(e) => setFilters({...filters, carpark: e.target.value})}
              >
                <option value="">All Carparks</option>
                <option value="Ang Mo Kio">Ang Mo Kio</option>
                <option value="Jurong West">Jurong West</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Building2 size={14} className="text-blue-500" /> Company
              </label>
              <select 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 transition-all outline-none"
                value={filters.company} 
                onChange={(e) => setFilters({...filters, company: e.target.value})}
              >
                <option value="">All Companies</option>
                <option value="HDB">HDB</option>
                <option value="URA">URA</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Calendar size={14} className="text-blue-500" /> Month
              </label>
              <input 
                type="month" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none" 
                onChange={(e) => setFilters({...filters, month: e.target.value})}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Hash size={14} className="text-blue-500" /> DDA Reference
              </label>
              <input 
                type="text" 
                placeholder="Search DDA..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
                value={filters.ddaRef} 
                onChange={(e) => setFilters({...filters, ddaRef: e.target.value})} 
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Car size={14} className="text-blue-500" /> IU/Vehicle No
              </label>
              <input 
                type="text" 
                placeholder="Search Vehicle..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
                value={filters.vehicleNo} 
                onChange={(e) => setFilters({...filters, vehicleNo: e.target.value})} 
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Table Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl mb-40"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[2800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-5 sticky left-0 bg-slate-50 z-30 w-10">
                    <button onClick={toggleSelectAll} className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                      {selectedRows.length === filteredData.length ? <CheckSquare className="text-blue-600"/> : <Square className="text-slate-300"/>}
                    </button>
                  </th>
                  {["ID", "Batch No", "Status", "Account Name", "DDA Reference", "Season No", "Vehicle No", "Type", "Company", "Rate", "Valid From", "Valid To", "Mos.", "VPC", "Amount Due", "Applied By", "Applied On", "Address"].map(head => (
                    <th key={head} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredData.map((item) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      key={item.id} 
                      className={`group transition-colors ${selectedRows.includes(item.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-5 sticky left-0 bg-inherit z-20 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                        <button onClick={() => toggleRow(item.id)} className="p-1">
                          {selectedRows.includes(item.id) ? <CheckSquare className="text-blue-600"/> : <Square className="text-slate-300 group-hover:text-slate-400"/>}
                        </button>
                      </td>
                      <td className="px-6 py-5 font-black text-blue-600 text-sm">{item.id}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-500">{item.batchNo}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-wider">{item.status}</span>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-800">{item.accountName}</td>
                      <td className="px-6 py-5 font-mono text-sm text-blue-500 font-bold">{item.ddaReference}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{item.seasonNo}</td>
                      <td className="px-6 py-5 font-black text-slate-900">{item.vehicleNo}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.type}</td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600">{item.company}</td>
                      <td className="px-6 py-5 text-sm font-black text-slate-800">${item.rate}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.validFrom}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.validTo}</td>
                      <td className="px-6 py-5 text-sm font-bold text-blue-600">{item.mos}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.vpc}</td>
                      <td className="px-6 py-5 text-sm font-black text-emerald-600">${item.amountDue}</td>
                      <td className="px-6 py-5 text-sm text-slate-500 uppercase font-bold">{item.appliedBy}</td>
                      <td className="px-6 py-5 text-sm text-slate-500">{item.appliedOn}</td>
                      <td className="px-6 py-5 text-sm text-slate-400 italic">{item.address}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Floating Centered Action Bar */}
        <motion.section 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          className="fixed bottom-20 left-0 right-0 mx-auto w-[calc(100%-4rem)] max-w-[1700px] z-[60] bg-slate-900/95 backdrop-blur-xl text-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-wrap items-center justify-between gap-6 border border-slate-700"
        >
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => exportGiro(false)} 
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all"
            >
              <FileText size={16} className="text-blue-400" /> Giro Report
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => exportGiro(true)} 
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all"
            >
              <Download size={16} className="text-blue-400" /> Giro Report (All)
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={toggleSelectAll} 
                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
             >
                {selectedRows.length === filteredData.length ? "Deselect All" : "Select All"}
             </button>

             <div className="h-8 w-px bg-slate-700 mx-2" />

             <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }} whileTap={{ scale: 0.95 }}
              onClick={() => handleAction("Reject")} 
              className="flex items-center gap-2 px-10 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-rose-900/20"
             >
                <XCircle size={18} /> Reject
             </motion.button>
             
             <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }} whileTap={{ scale: 0.95 }}
              onClick={() => handleAction("Approve")} 
              className="flex items-center gap-2 px-10 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/20"
             >
                <CheckCircle size={18} /> Approve
             </motion.button>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default GiroUpdate;