import { create } from 'zustand';
import { ThemeState } from '../types';

export const useThemeStore = create<ThemeState>((set) => {
  // Check if there's a saved preference in localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Use saved preference or system preference
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Apply theme to document
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  
  return {
    theme: initialTheme,
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Apply to document
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        
        return { theme: newTheme };
      });
    },
  };
});

export default useThemeStore;