import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Download, FileText, Settings, 
  Check, X, Loader2, MapPin, Building2, 
  UserCircle, CreditCard, Cpu, SlidersHorizontal 
} from "lucide-react";

const SeasonMasterList = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  // 1. Filter States
  const [filters, setFilters] = useState({
    carpark: "",
    company: "",
    holderType: "",
    paymentMode: "",
    vehicleSearch: "" // For IU or Vehicle No
  });

  // List of all 26 columns
  const [visibleColumns, setVisibleColumns] = useState({
    ID: true, Timestamp: true, ReceiptNo: true, Status: true, Type: true,
    Period: true, SeasonNo: true, MultiSeason: false, VehicleNo: true,
    HolderType: true, Rate: true, HolderName: true, Company: true,
    Address: false, ContactNo: true, Email: true, ValidFrom: true,
    ValidTo: true, AmountPaid: true, VPC: false, Admin: true,
    PaymentMode: true, Cheque: false, DatePaid: true, UpdatedBy: true, Remarks: false
  });

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const mockData = Array.from({ length: 10 }).map((_, i) => ({
        id: 100 + i,
        timestamp: "2025-12-31 13:25",
        receiptNo: `R-${8800 + i}`,
        status: "Active",
        type: "Renewal",
        period: "Monthly",
        seasonNo: `SN-${500 + i}`,
        multiSeason: "No",
        vehicleNo: `SGA${9000 + i}Z`,
        holderType: "Public",
        rate: 120.00,
        holderName: "Alex Rivera",
        company: "Global Logistics",
        address: "Industrial Loop 5, Singapore",
        contactNo: "98881234",
        email: "alex@global.co",
        validFrom: "2026-01-01",
        validTo: "2026-01-31",
        amountPaid: 125.00,
        vpc: 0,
        admin: 5.00,
        paymentMode: "Credit Card",
        cheque: "-",
        datePaid: "2025-12-30",
        updatedBy: "System_Bot",
        remarks: "Auto-processed"
      }));
      setResults(mockData);
      setIsSearching(false);
    }, 1200);
  };

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      
      {/* --- Main Content with Offset for NavBar --- */}
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1800px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full" />
              SEASON MASTER DATA
            </h1>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <button 
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="flex-1 lg:flex-none bg-white border-2 border-slate-200 px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 relative"
            >
              <Settings size={14} /> Columns
            </button>
            <button className="flex-1 lg:flex-none bg-white border-2 border-slate-200 px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* --- FILTER BAR SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-6 shadow-xl border-2 border-slate-100 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* 1. Carpark */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                <MapPin size={10}/> Carpark
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-blue-500 outline-none"
                value={filters.carpark}
                onChange={(e) => setFilters({...filters, carpark: e.target.value})}
              >
                <option value="">All Carparks</option>
                <option>AMK Central</option>
                <option>Bedok Mall</option>
              </select>
            </div>

            {/* 2. Company */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                <Building2 size={10}/> Company
              </label>
              <input 
                type="text" 
                placeholder="Search company..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-blue-500 outline-none"
                value={filters.company}
                onChange={(e) => setFilters({...filters, company: e.target.value})}
              />
            </div>

            {/* 3. Holder Type */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                <UserCircle size={10}/> Holder Type
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-blue-500 outline-none"
                value={filters.holderType}
                onChange={(e) => setFilters({...filters, holderType: e.target.value})}
              >
                <option value="">All Types</option>
                <option>Permanent</option>
                <option>Public</option>
                <option>Tenant</option>
              </select>
            </div>

            {/* 4. Payment Mode */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                <CreditCard size={10}/> Payment Mode
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-blue-500 outline-none"
                value={filters.paymentMode}
                onChange={(e) => setFilters({...filters, paymentMode: e.target.value})}
              >
                <option value="">All Modes</option>
                <option>Cash</option>
                <option>GIRO</option>
                <option>Credit Card</option>
              </select>
            </div>

            {/* 5. IU/Vehicle Search */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                <Cpu size={10}/> IU / Vehicle No
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. SGA1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-blue-500 outline-none uppercase"
                  value={filters.vehicleSearch}
                  onChange={(e) => setFilters({...filters, vehicleSearch: e.target.value})}
                />
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center min-w-[40px]"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- COLUMN PICKER POPUP --- */}
        <AnimatePresence>
          {showColumnPicker && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 bg-white border-2 border-slate-100 shadow-2xl p-6 rounded-[2rem] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-4xl left-4 right-4 md:left-auto md:right-8"
            >
              {Object.keys(visibleColumns).map(col => (
                <button 
                  key={col}
                  onClick={() => toggleColumn(col)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold transition-all ${visibleColumns[col] ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}
                >
                  {visibleColumns[col] ? <Check size={12}/> : <X size={12}/>} {col}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- DATA TABLE --- */}
        <motion.div layout className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-420px)]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-30 bg-slate-900 text-white">
                <tr className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  {visibleColumns.VehicleNo && <th className="p-5 sticky left-0 bg-slate-900 z-40 border-r border-slate-800">Vehicle No</th>}
                  {visibleColumns.ID && <th className="p-5">ID</th>}
                  {visibleColumns.Timestamp && <th className="p-5">Timestamp</th>}
                  {visibleColumns.ReceiptNo && <th className="p-5">Receipt No</th>}
                  {visibleColumns.Status && <th className="p-5 text-center">Status</th>}
                  {visibleColumns.Type && <th className="p-5">Type</th>}
                  {visibleColumns.Period && <th className="p-5">Period</th>}
                  {visibleColumns.SeasonNo && <th className="p-5">Season No</th>}
                  {visibleColumns.MultiSeason && <th className="p-5">Multi</th>}
                  {visibleColumns.HolderType && <th className="p-5">Holder Type</th>}
                  {visibleColumns.Rate && <th className="p-5">Rate</th>}
                  {visibleColumns.HolderName && <th className="p-5">Holder Name</th>}
                  {visibleColumns.Company && <th className="p-5">Company</th>}
                  {visibleColumns.Address && <th className="p-5">Address</th>}
                  {visibleColumns.ContactNo && <th className="p-5">Contact</th>}
                  {visibleColumns.Email && <th className="p-5">Email</th>}
                  {visibleColumns.ValidFrom && <th className="p-5">Valid From</th>}
                  {visibleColumns.ValidTo && <th className="p-5">Valid To</th>}
                  {visibleColumns.AmountPaid && <th className="p-5">Paid</th>}
                  {visibleColumns.VPC && <th className="p-5">VPC</th>}
                  {visibleColumns.Admin && <th className="p-5 text-rose-400">Admin Chg</th>}
                  {visibleColumns.PaymentMode && <th className="p-5">Mode</th>}
                  {visibleColumns.Cheque && <th className="p-5">Cheque</th>}
                  {visibleColumns.DatePaid && <th className="p-5">Date Paid</th>}
                  {visibleColumns.UpdatedBy && <th className="p-5">Updated By</th>}
                  {visibleColumns.Remarks && <th className="p-5">Remarks</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.map((row, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    key={row.id} 
                    className="hover:bg-blue-50/50 transition-colors text-[11px] group"
                  >
                    {visibleColumns.VehicleNo && (
                      <td className="p-4 sticky left-0 bg-white group-hover:bg-blue-50 font-black text-blue-600 font-mono border-r border-slate-50 z-10">
                        {row.vehicleNo}
                      </td>
                    )}
                    {visibleColumns.ID && <td className="p-4 font-bold text-slate-400">#{row.id}</td>}
                    {visibleColumns.Timestamp && <td className="p-4 text-slate-500 font-mono">{row.timestamp}</td>}
                    {visibleColumns.ReceiptNo && <td className="p-4 font-bold text-slate-700">{row.receiptNo}</td>}
                    {visibleColumns.Status && (
                      <td className="p-4 text-center">
                        <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 font-black text-[9px] uppercase border border-emerald-100">
                          {row.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.Type && <td className="p-4 text-slate-600">{row.type}</td>}
                    {visibleColumns.Period && <td className="p-4 text-slate-600">{row.period}</td>}
                    {visibleColumns.SeasonNo && <td className="p-4 font-bold">{row.seasonNo}</td>}
                    {visibleColumns.MultiSeason && <td className="p-4">{row.multiSeason}</td>}
                    {visibleColumns.HolderType && <td className="p-4">{row.holderType}</td>}
                    {visibleColumns.Rate && <td className="p-4 font-bold">${row.rate.toFixed(2)}</td>}
                    {visibleColumns.HolderName && <td className="p-4 font-bold text-slate-800">{row.holderName}</td>}
                    {visibleColumns.Company && <td className="p-4 text-slate-600 whitespace-nowrap">{row.company}</td>}
                    {visibleColumns.Address && <td className="p-4 text-slate-500 truncate max-w-[150px]">{row.address}</td>}
                    {visibleColumns.ContactNo && <td className="p-4 font-mono">{row.contactNo}</td>}
                    {visibleColumns.Email && <td className="p-4 text-blue-500">{row.email}</td>}
                    {visibleColumns.ValidFrom && <td className="p-4 font-bold">{row.validFrom}</td>}
                    {visibleColumns.ValidTo && <td className="p-4 font-bold">{row.validTo}</td>}
                    {visibleColumns.AmountPaid && <td className="p-4 font-black text-emerald-600">${row.amountPaid.toFixed(2)}</td>}
                    {visibleColumns.VPC && <td className="p-4">${row.vpc.toFixed(2)}</td>}
                    {visibleColumns.Admin && <td className="p-4 font-bold text-rose-500">${row.admin.toFixed(2)}</td>}
                    {visibleColumns.PaymentMode && <td className="p-4 font-black text-slate-400">{row.paymentMode}</td>}
                    {visibleColumns.Cheque && <td className="p-4">{row.cheque}</td>}
                    {visibleColumns.DatePaid && <td className="p-4">{row.datePaid}</td>}
                    {visibleColumns.UpdatedBy && <td className="p-4 font-bold text-slate-700">{row.updatedBy}</td>}
                    {visibleColumns.Remarks && <td className="p-4 text-slate-400 italic">{row.remarks}</td>}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SeasonMasterList;