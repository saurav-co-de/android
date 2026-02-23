import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode, toggleSidebar, sidebarOpen }) => {
    return (
        <header className="sticky top-0 z-30 w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="hidden lg:block">
                        {/* Empty space for sidebar alignment or breadcrumbs */}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 transition-all shadow-sm"
                        aria-label="Toggle Theme"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            AL
                        </div>
                        <span className="hidden sm:block text-sm font-semibold">User</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
