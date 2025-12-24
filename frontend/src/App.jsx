import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/NavBar";
import AboutPage from "./components/AboutPage";

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="p-20 text-white text-2xl font-mono">{title} Page Coming Soon...</div>
);

function App() {
  const user = {
    name: "Elliott",
    level: "Admin",
    lastLogin: "24 Dec 2025, 10:20 AM",
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#030712]">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            {/* You can add specific routes for your menu items here */}
            <Route path="/season/new" element={<PlaceholderPage title="New Season" />} />
            <Route path="/reports/revenue" element={<PlaceholderPage title="Revenue Report" />} />
            <Route path="/system/manage-users" element={<PlaceholderPage title="Manage Users" />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <footer className="px-8 py-3 border-t border-white/5 bg-black/20 text-[10px] text-slate-600 font-mono flex justify-between">
          <span>ENCRYPTED_CONNECTION: ACTIVE</span>
          <span>© 2025 PARK_SYS CORE v4.0.2</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;