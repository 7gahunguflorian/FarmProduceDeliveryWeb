import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ProtectedRoute from './utils/ProtectedRoute';
import useAuthStore from './store/authStore';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import DeliveriesPage from './pages/DeliveriesPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Initial auth check failed:', error);
        useAuthStore.getState().logout();
      } finally {
        setIsInitializing(false);
      }
    };

    if (localStorage.getItem('token')) {
      initializeAuth();
    } else {
      setIsInitializing(false);
    }
  }, [checkAuth]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } />
        
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<UsersPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;