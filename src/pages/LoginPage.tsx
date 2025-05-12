import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useAuthStore from '../store/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError, isLoading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'FARMER' | 'CLIENT'>('CLIENT');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!username || !password) {
      return;
    }
    
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!name || !username || !email || !password) {
      return;
    }
    
    try {
      await useAuthStore.getState().register({
        name,
        username,
        email,
        password,
        role,
      });
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Leaf className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {showRegister ? 'Create a new account' : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md p-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          
          {showRegister ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="role"
                      checked={role === 'FARMER'}
                      onChange={() => setRole('FARMER')}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Farmer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="role"
                      checked={role === 'CLIENT'}
                      onChange={() => setRole('CLIENT')}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Client</span>
                  </label>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Register
                </Button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-6">
            <button
              type="button"
              className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;