import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 border-r bg-white dark:bg-gray-800 z-20">
        <Sidebar />
      </div>
      {/* Main content area with left margin */}
      <div className="ml-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;