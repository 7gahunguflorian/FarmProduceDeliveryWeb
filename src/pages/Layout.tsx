import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Topbar />
      <main className="pt-16 md:ml-64 ml-20 transition-all duration-200 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;