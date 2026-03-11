import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-30 w-full glass-effect">
            <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2.5 rounded-xl hover:bg-[var(--bg-card)] transition-colors text-[var(--text-primary)]"
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <div className="hidden lg:flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded-md">
                            Workspace
                        </span>
                        <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />
                        <span className="text-xs font-bold text-[var(--text-secondary)]">Main Branch</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/50 transition-all shadow-sm"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>

                    <div className="h-8 w-[1px] bg-[var(--border-subtle)] mx-1"></div>

                    <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-[var(--bg-card)] transition-all group">
                        <span className="hidden sm:block text-xs font-black text-[var(--text-primary)]">GOJO</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white ring-2 ring-white/10 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                            <User size={16} />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
