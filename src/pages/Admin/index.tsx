import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Dashboard } from './Dashboard';
import { Orders } from './Orders';
import { Customers } from './Customers';

export function Admin() {
  return (
    <div className="flex gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </div>
  );
}