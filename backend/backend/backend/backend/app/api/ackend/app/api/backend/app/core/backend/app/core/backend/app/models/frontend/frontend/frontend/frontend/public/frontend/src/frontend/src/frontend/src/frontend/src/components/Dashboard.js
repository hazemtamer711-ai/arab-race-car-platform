import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold border-b">منصة هندسة سيارات السباق</div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li><Link to="/brakes" className="block p-2 hover:bg-blue-100 rounded">نظام المكابح</Link></li>
            <li><Link to="/bearing" className="block p-2 hover:bg-blue-100 rounded">اختيار الرولمان</Link></li>
            <li><Link to="/track" className="block p-2 hover:bg-blue-100 rounded">محاكاة الحلبة</Link></li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
