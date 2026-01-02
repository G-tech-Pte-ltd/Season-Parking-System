import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, RotateCcw, Building2, Calendar, Hash, 
  Car, CheckCircle, ArrowRight, Filter, Users,
  CheckSquare, Square, ChevronDown
} from "lucide-react";

const GiroRenewal = () => {
  // --- STATE ---
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    carpark: "",
    company: "",
    month: "",
    year: "",
    holderType: "",
    vehicleNo: "",
    showApplied: false,
    onlyDDA: false
  });

  // --- MOCK DATA ---
  const [data] = useState([
    {
      id: "R-901", batchNo: "REN-2026-01", status: "Pending", accountName: "John Doe",
      ddaReference: "DDA-XM992", seasonNo: "S-1002", vehicleNo: "SBA1234K",
      type: "Car", company: "HDB", rate: 90, validFrom: "01 Feb 2026",
      validTo: "30 Apr 2026", mos: 3, vpc: "VPC-A", amountDue: 270,
      appliedBy: "System", appliedOn: "01 Jan 2026", address: "Jurong West St 42"
    },
    // Add more mock items here
  ]);

  // --- LOGIC ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (filters.carpark === "" || item.address.includes(filters.carpark)) &&
        (filters.company === "" || item.company === filters.company) &&
        (filters.vehicleNo === "" || item.vehicleNo.toLowerCase().includes(filters.vehicleNo.toLowerCase())) &&
        (!filters.onlyDDA || item.ddaReference)
      );
    });
  }, [data, filters]);

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) setSelectedRows([]);
    else setSelectedRows(filteredData.map(item => item.id));
  };

  const toggleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32 font-poppins text-slate-900">
      <main className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight italic uppercase text-blue-900">
              GIRO <span className="text-blue-500">Renewal</span>
            </h1>
            <p className="text-slate-500 font-medium">Process and validate season parking renewals via GIRO.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Batch</span>
            <p className="font-black text-blue-600">JANUARY 2026</p>
          </div>
        </header>

        {/* --- FILTERS --- */}
        <section className="bg-white border-2 border-blue-50 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 items-end">
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Building2 size={14} className="text-blue-500" /> Carpark
              </label>
              <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none"
                value={filters.carpark} onChange={(e) => setFilters({...filters, carpark: e.target.value})}>
                <option value="">All Carparks</option>
                <option value="Jurong">Jurong West</option>
                <option value="Tampines">Tampines Central</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Building2 size={14} className="text-blue-500" /> Company
              </label>
              <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none"
                value={filters.company} onChange={(e) => setFilters({...filters, company: e.target.value})}>
                <option value="">All Companies</option>
                <option value="HDB">HDB</option>
                <option value="URA">URA</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Calendar size={14} className="text-blue-500" /> Month/Year
              </label>
              <div className="flex gap-2">
                <select className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-2 py-3 text-sm font-bold focus:border-blue-500 outline-none">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m}>{m}</option>)}
                </select>
                <select className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-2 py-3 text-sm font-bold focus:border-blue-500 outline-none">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Users size={14} className="text-blue-500" /> Holder Type
              </label>
              <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none"
                value={filters.holderType} onChange={(e) => setFilters({...filters, holderType: e.target.value})}>
                <option value="">All Types</option>
                <option value="Resident">Resident</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Car size={14} className="text-blue-500" /> Vehicle No
              </label>
              <input type="text" placeholder="SJB..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-blue-500 outline-none"
                value={filters.vehicleNo} onChange={(e) => setFilters({...filters, vehicleNo: e.target.value})} />
            </div>

            <div className="flex flex-col gap-2 pb-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={filters.showApplied} onChange={() => setFilters({...filters, showApplied: !filters.showApplied})} />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.showApplied ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                  {filters.showApplied && <CheckCircle size={12} className="text-white" />}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Show Applied</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden" checked={filters.onlyDDA} onChange={() => setFilters({...filters, onlyDDA: !filters.onlyDDA})} />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.onlyDDA ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                  {filters.onlyDDA && <CheckCircle size={12} className="text-white" />}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Only with DDA</span>
              </label>
            </div>
          </div>
        </section>

        {/* --- DATA TABLE --- */}
        <section className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl mb-40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[2800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 sticky left-0 bg-slate-50 z-30 w-10">
                    <button onClick={toggleSelectAll} className="hover:scale-110 transition-transform">
                      {selectedRows.length === filteredData.length ? <CheckSquare className="text-blue-600"/> : <Square className="text-slate-300"/>}
                    </button>
                  </th>
                  {["ID", "Batch No", "Status", "Account Name", "DDA Reference", "Season No", "Vehicle No", "Type", "Company", "Rate", "Valid From", "Valid To", "Mos.", "VPC", "Amount Due", "Applied By", "Applied On", "Address"].map(head => (
                    <th key={head} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item) => (
                  <tr key={item.id} className={`hover:bg-blue-50/30 transition-colors ${selectedRows.includes(item.id) ? 'bg-blue-50/50' : ''}`}>
                    <td className="px-6 py-5 sticky left-0 bg-white z-20 group-hover:bg-blue-50/30 transition-colors">
                      <button onClick={() => toggleRow(item.id)}>
                        {selectedRows.includes(item.id) ? <CheckSquare className="text-blue-600"/> : <Square className="text-slate-200"/>}
                      </button>
                    </td>
                    <td className="px-6 py-5 font-black text-blue-600 text-sm">{item.id}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-500">{item.batchNo}</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider">{item.status}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-800">{item.accountName}</td>
                    <td className="px-6 py-5 font-mono text-sm text-blue-500 font-bold">{item.ddaReference || "-"}</td>
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
                    <td className="px-6 py-5 text-sm text-slate-500">{item.appliedBy}</td>
                    <td className="px-6 py-5 text-sm text-slate-500">{item.appliedOn}</td>
                    <td className="px-6 py-5 text-sm text-slate-400">{item.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- FIXED BOTTOM BAR --- */}
        <motion.section 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-0 right-0 mx-auto w-[calc(100%-4rem)] max-w-[1700px] z-[60] bg-slate-900 text-white rounded-[2.5rem] p-6 shadow-2xl flex flex-wrap items-center justify-between border border-slate-700"
        >
          <div className="flex gap-4 items-center">
            <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Selected</span>
              <span className="text-xl font-black text-blue-400">{selectedRows.length} <span className="text-sm text-slate-500 underline uppercase italic">Records</span></span>
            </div>
            <button 
              onClick={toggleSelectAll}
              className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
            >
              {selectedRows.length === filteredData.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="flex gap-4">
             <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40"
             >
                <CheckCircle size={18} /> Apply Renewal
             </motion.button>
             
             <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-600"
             >
                Review GIRO <ArrowRight size={18} className="text-blue-400" />
             </motion.button>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default GiroRenewal;