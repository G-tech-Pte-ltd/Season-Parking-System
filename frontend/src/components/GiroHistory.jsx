import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, RotateCcw, History, Download, 
  CheckCircle2, XCircle, ChevronRight,
  User, Clock, FileText, Landmark, Calendar, Info
} from "lucide-react";

const GiroHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedHistory, setSelectedHistory] = useState(null);

  // --- FULL 18-FIELD MOCK DATA ---
  const [historyData] = useState([
    { 
      id: "H-2026-001", 
      batchNo: "B-JAN-01", 
      status: "Success", 
      ddaReference: "DDA88219",
      accountName: "Tan Ah Teck", 
      seasonNo: "S-9921", 
      vehicleNo: "SJB1234A",
      holderType: "Resident", 
      company: "HDB", 
      validFrom: "2026-01-01",
      validTo: "2026-03-31", 
      vpc: "VPC-01", 
      amountDue: 330,
      appliedBy: "Self-Service Portal", 
      appliedOn: "2025-12-28 10:00 AM",
      updatedBy: "Admin_Sarah", 
      updatedOn: "2026-01-02 09:45 AM",
      remarks: "DDA Reference verified. Customer opted for 3-month renewal."
    },
    { 
      id: "H-2026-002", 
      batchNo: "B-JAN-01", 
      status: "Failed", 
      ddaReference: "DDA44567",
      accountName: "Siti Aminah", 
      seasonNo: "S-8812", 
      vehicleNo: "SLK5678C",
      holderType: "Tenant", 
      company: "URA", 
      validFrom: "2026-02-01",
      validTo: "2026-04-30", 
      vpc: "VPC-05", 
      amountDue: 450,
      appliedBy: "Counter Staff (AMK)", 
      appliedOn: "2026-01-01 02:00 PM",
      updatedBy: "System_Auto", 
      updatedOn: "2026-01-01 02:20 PM",
      remarks: "Transaction declined: Insufficient funds in bank account."
    }
  ]);

  const filteredHistory = useMemo(() => {
    return historyData.filter(item => {
      const match = (item.accountName + item.vehicleNo + item.ddaReference + item.id).toLowerCase();
      const matchesSearch = match.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, historyData]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32 font-poppins text-slate-900">
      <main className="max-w-[1700px] mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight italic uppercase flex items-center gap-4">
              <History className="text-blue-600" size={36} />
              GIRO <span className="text-blue-600">Audit History</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">Comprehensive tracking of all GIRO applications, updates, and statuses.</p>
          </div>
          <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
            <Download size={16} /> Download Full CSV
          </button>
        </header>

        {/* Search & Filters */}
        <section className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 mb-8 flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[350px] relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by ID, Name, Vehicle, or DDA..."
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {["All", "Success", "Failed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  statusFilter === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button onClick={() => {setSearchTerm(""); setStatusFilter("All");}} className="p-4 text-slate-300 hover:text-blue-600 transition-colors">
            <RotateCcw size={22} />
          </button>
        </section>

        {/* Audit Table */}
        <section className="bg-white border-2 border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Batch</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">DDA Reference</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Name</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle / Season No</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company / VPC</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredHistory.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-blue-600">{log.id}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{log.batchNo}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-2 w-fit ${
                        log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {log.status === 'Success' ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-mono text-sm font-bold text-slate-500">{log.ddaReference}</td>
                    <td className="px-8 py-6 text-sm font-black text-slate-800">{log.accountName}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-700">{log.vehicleNo}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.seasonNo}</p>
                    </td>
                    <td className="px-8 py-6 text-sm">
                      <p className="font-bold text-slate-700">{log.company}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.vpc}</p>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-emerald-600">${log.amountDue}</td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedHistory(log)}
                        className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- FULL 18-FIELD AUDIT PANEL --- */}
        <AnimatePresence>
          {selectedHistory && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedHistory(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-xl bg-white z-[101] shadow-2xl flex flex-col">
                
                {/* Panel Header */}
                <div className="p-8 bg-slate-900 text-white">
                   <button onClick={() => setSelectedHistory(null)} className="mb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                     <ChevronRight size={14} className="rotate-180" /> Back to History List
                   </button>
                   <h2 className="text-2xl font-black italic uppercase leading-none">Complete <span className="text-blue-400">Audit Record</span></h2>
                   <p className="mt-3 text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">{selectedHistory.id} • {selectedHistory.batchNo}</p>
                </div>

                {/* Panel Body (All 18 Fields) */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10">
                  
                  {/* Section 1: Entity Info */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Account Information</p>
                    <div className="grid grid-cols-2 gap-8">
                      <DetailItem label="Account Name" value={selectedHistory.accountName} icon={<User size={14}/>} />
                      <DetailItem label="Holder Type" value={selectedHistory.holderType} icon={<Info size={14}/>} />
                      <DetailItem label="Vehicle No" value={selectedHistory.vehicleNo} />
                      <DetailItem label="Season No" value={selectedHistory.seasonNo} />
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Section 2: Financial/System Info */}
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Transaction Details</p>
                    <div className="grid grid-cols-2 gap-8">
                      <DetailItem label="DDA Reference" value={selectedHistory.ddaReference} isMono />
                      <DetailItem label="Company" value={selectedHistory.company} icon={<Landmark size={14}/>} />
                      <DetailItem label="VPC Code" value={selectedHistory.vpc} />
                      <DetailItem label="Amount Due" value={`$${selectedHistory.amountDue}`} isBold />
                      <DetailItem label="Valid From" value={selectedHistory.validFrom} icon={<Calendar size={14}/>} />
                      <DetailItem label="Valid To" value={selectedHistory.validTo} />
                    </div>
                  </div>

                  {/* Section 3: Audit Trail (The timestamps) */}
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 space-y-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Processing Logs</p>
                    <div className="flex gap-4">
                      <div className="w-px bg-slate-200 relative">
                        <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-blue-500" />
                        <div className="absolute bottom-0 -left-1 w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase">Originally Applied By</p>
                          <p className="text-sm font-bold text-slate-800">{selectedHistory.appliedBy}</p>
                          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1"><Clock size={10}/> {selectedHistory.appliedOn}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase">Last Updated By</p>
                          <p className="text-sm font-bold text-slate-800">{selectedHistory.updatedBy}</p>
                          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1"><Clock size={10}/> {selectedHistory.updatedOn}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Remarks */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <FileText size={14}/> Administrative Remarks
                    </p>
                    <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-2xl">
                      <p className="text-sm font-medium text-amber-900 leading-relaxed italic">
                        "{selectedHistory.remarks}"
                      </p>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="p-8 border-t border-slate-100 bg-white">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200">
                    Print Official Audit Log
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

// Sub-component for Side Panel
const DetailItem = ({ label, value, icon, isMono, isBold }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
      {icon} {label}
    </p>
    <p className={`text-sm ${isMono ? 'font-mono text-blue-600' : 'text-slate-800'} ${isBold ? 'text-lg font-black' : 'font-bold'}`}>
      {value || "N/A"}
    </p>
  </div>
);

export default GiroHistory;