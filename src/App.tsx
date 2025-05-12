import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ProtectedRoute from './utils/ProtectedRoute';
import useAuthStore from './store/authStore';
import userService from './services/userService';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // If user is authenticated but user profile is not loaded
    if (isAuthenticated && !user) {
      const loadUser = async () => {
        try {
          const currentUser = await userService.getCurrentUser();
          useAuthStore.setState({ user: currentUser });
        } catch (error) {
          console.error('Failed to load user profile:', error);
          useAuthStore.setState({ isAuthenticated: false, token: null });
        }
      };
      
      loadUser();
    }
  }, [isAuthenticated, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <LoginPage />
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
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
    </BrowserRouter>
  );
}

export default App;