// User related types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  profileImageUrl?: string;
}

export type UserRole = 'ADMIN' | 'FARMER' | 'CLIENT';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product related types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  availableQuantity: number;
  imageUrl?: string;
  farmerId: number;
}

// Order related types
export interface Order {
  id: number;
  clientUsername: string;
  orderDate: string;
  farmerUsername: string;
  clientLocation: string;
  deliveryDate?: string;
  orderPrice: number;
}

// Dashboard related types
export interface DashboardStats {
  totalOrders: number;
  totalSuccessfulDeliveries: number;
  totalFarmers: number;
  totalClients: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface DeliveryData {
  date: string;
  deliveries: number;
}

export interface PaymentData {
  date: string;
  income: number;
  outgoing: number;
}

export interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}