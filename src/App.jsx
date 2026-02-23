import React, { useState, useEffect, useMemo } from 'react';
import { programs } from './data/programs';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProgramContent from './components/ProgramContent';
import { Toaster } from 'react-hot-toast';
import sukonaVideo from './assets/sukona.mp4';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-gray-50/10 dark:bg-gray-900/10 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-40 dark:opacity-20 transition-opacity duration-500"
      >
        <source src={sukonaVideo} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="fixed inset-0 bg-white/20 dark:bg-gray-900/40 backdrop-blur-[2px] -z-10"></div>

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

      <div className="lg:pl-72 flex flex-col min-h-screen relative z-10">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProgramContent program={activeProgram} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
