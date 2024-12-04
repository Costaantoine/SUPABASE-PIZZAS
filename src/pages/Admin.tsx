import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { Dashboard } from './Admin/Dashboard';
import { Orders } from './Admin/Orders';
import { Menu } from './Admin/Menu';
import { Customers } from './Admin/Customers';

export function Admin() {
  return (
    <div className="flex gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </div>
  );
}