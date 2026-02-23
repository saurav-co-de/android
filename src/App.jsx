import React, { useState, useEffect, useMemo } from 'react';
import { programs } from './data/programs';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProgramContent from './components/ProgramContent';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeId, setActiveId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeProgram = programs.find(p => p.id === activeId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Toaster position="bottom-right" />

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        programs={filteredPrograms}
        activeId={activeId}
        setActiveId={setActiveId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 overflow-y-auto">
          <ProgramContent program={activeProgram} />
        </div>
      </div>
    </div>
  );
}

export default App;
