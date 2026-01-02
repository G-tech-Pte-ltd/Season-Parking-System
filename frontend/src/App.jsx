import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/NavBar";
import AboutPage from "./components/AboutPage";
import CarparkDetails from "./components/CarParkDetails";
import NewSeason from "./components/NewSeason";
import EditSeasonPage from "./components/EditSeasonPage";
import RenewalSeason from "./components/RenewalSeason";
import ChangeVehiclePage from "./components/ChangeVehiclePage";
import TerminateSeasonPage from "./components/TerminateSeasonPage";
import ExpiredSeasonsPage from "./components/ExpiredSeasonPage";
import SeasonMasterPage from "./components/SeasonMaster";
import SeasonHistory from "./components/SeasonHistory";
import GiroUpdate from "./components/GiroUpdate";
import GiroRenewal from "./components/GiroRenewal";
import UpdateDDAList from "./components/GiroDDA";
import GiroHistory from "./components/GiroHistory";

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="p-20 text-slate-800 text-2xl font-mono">{title} Page Coming Soon...</div>
);

function App() {
  const user = {
    name: "Elliott",
    level: "Admin",
    lastLogin: "24 Dec 2025, 10:20 AM",
  };

  return (
    <Router>
      {/* 2. Added 'w-full' to ensure the background fills the entire screen */}
      <div className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-800 font-poppins relative overflow-hidden">
        
        {/* The Navbar stays fixed at the top */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            
            {/* Carpark Section */}
            <Route path="/carpark/carpark-details" element={<CarparkDetails />} />
            
            {/* Season Section - Align with Navbar Logic */}
            <Route path="/season/new" element={<NewSeason />} />
            <Route path="/season/edit" element={<EditSeasonPage />} />
            <Route path="/season/renewal" element={<RenewalSeason />} />
            <Route path="/season/multi-renewal" element={<PlaceholderPage title="Multi-Renewal" />} />
            <Route path="/season/change-vehicle" element={<ChangeVehiclePage />} />
            <Route path="/season/terminate" element={<TerminateSeasonPage />} />
            <Route path="/season/expiring" element={<ExpiredSeasonsPage />} />
            <Route path="/season/master" element={<SeasonMasterPage />} />
            <Route path="/season/history" element={<SeasonHistory />} />

            {/* Giro Section - Align with Navbar Logic */}
            <Route path="/giro/approve-reject" element={<GiroUpdate />} />
            <Route path="/giro/renewal" element={<GiroRenewal />} />
            <Route path="/giro/update-dda" element={<UpdateDDAList />} />
            <Route path="/giro/history" element={<GiroHistory />} />

            {/* System Section */}
            <Route path="/system/manage-users" element={<PlaceholderPage title="Manage Users" />} />
            
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <footer className="px-8 py-3 border-t border-slate-200 bg-white/50 text-[10px] text-slate-400 font-mono flex justify-between relative z-10">
          <span>ENCRYPTED_CONNECTION: ACTIVE</span>
          <span>© 2025 G.TECH PARK_SYS v4.0.2</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;