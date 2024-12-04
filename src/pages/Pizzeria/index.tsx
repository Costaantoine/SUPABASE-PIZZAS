import { Routes, Route } from 'react-router-dom';
import { PizzeriaSidebar } from './PizzeriaSidebar';
import { PizzeriaDashboard } from './PizzeriaDashboard';
import { PizzeriaOrders } from './PizzeriaOrders';
import { PizzeriaCustomers } from './PizzeriaCustomers';
import { MenuManagement } from './MenuManagement';
import { Settings } from './Settings';
import { ExtrasManagement } from './ExtrasManagement';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export function Pizzeria() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-primary-50">
      {/* Mobile menu button - Only show when sidebar is closed */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed md:hidden top-20 left-4 z-30 bg-white p-2 rounded-lg shadow-lg"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-primary-800" />
      </button>

      <div className="flex">
        {/* Sidebar */}
        <PizzeriaSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main content */}
        <div className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<PizzeriaDashboard />} />
            <Route path="/commandes" element={<PizzeriaOrders />} />
            <Route path="/clients" element={<PizzeriaCustomers />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/parametres" element={<Settings />} />
            <Route path="/supplements" element={<ExtrasManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}