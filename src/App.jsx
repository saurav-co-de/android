import React, { useState, useMemo } from 'react';
import { programs } from './data/programs';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProgramContent from './components/ProgramContent';
import { Toaster } from 'react-hot-toast';
import sukonaVideo from './assets/sukona.mp4';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function AppContent() {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeProgram = programs.find(p => p.id === activeId);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative overflow-hidden">
      {/* Background Video with Premium Multi-layer Blending */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20 opacity-50 dark:opacity-30 transition-opacity duration-1000"
      >
        <source src={sukonaVideo} type="video/mp4" />
      </video>

      {/* Premium Gradient Overlay for Depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/40 dark:from-black/60 dark:via-transparent dark:to-black/60 -z-10 pointer-events-none" />

      {/* Interactive Surface Blur */}
      <div className="fixed inset-0 bg-white/10 dark:bg-slate-950/40 backdrop-blur-[4px] -z-10" />

      <Toaster position="bottom-right" />

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-md"
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
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <ProgramContent program={activeProgram} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
