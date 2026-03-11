import React, { useState } from 'react';
import { Search, Terminal, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ programs, activeId, setActiveId, searchQuery, setSearchQuery, isOpen, setIsOpen }) => {
    return (
        <aside className={`
            fixed top-0 left-0 z-40 h-screen w-72 
            transition-transform duration-500 ease-in-out
            lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            glass-effect border-r border-[var(--border-subtle)]
        `}>
            <div className="h-full flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                    <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-2 ring-white/10">
                        <Terminal className="text-white" size={22} />
                    </div>
                    <div>
                        <h2 className="font-black text-xl tracking-tight text-[var(--text-primary)]">LABS <span className="text-[var(--accent-primary)]">PORTAL</span></h2>
                        <div className="h-0.5 w-12 bg-[var(--accent-primary)] rounded-full mt-0.5" />
                    </div>
                </div>

                <div className="relative mb-8 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors group-focus-within:text-[var(--accent-primary)]" size={16} />
                    <input
                        type="text"
                        placeholder="Search programs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--bg-card)]/50 backdrop-blur-sm border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-4 focus:ring-[var(--accent-primary)]/10 focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-secondary)]/40"
                    />
                </div>

                <div className="flex-1 overflow-y-auto -mx-3 px-3 pb-6 space-y-2">
                    {programs.length > 0 ? (
                        programs.map((program, index) => {
                            const isActive = activeId === program.id;
                            return (
                                <motion.button
                                    key={program.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => {
                                        setActiveId(program.id);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 group relative
                                        ${isActive
                                            ? 'text-white'
                                            : 'text-[var(--text-secondary)] hover:bg-indigo-500/5 hover:text-[var(--text-primary)]'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-highlight"
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`
                                        flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black
                                        ${isActive ? 'bg-white/20 border border-white/30' : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]'}
                                    `}>
                                        {program.id}
                                    </span>
                                    <span className={`text-sm tracking-tight truncate flex-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                                        {program.title}
                                    </span>
                                    <ChevronRight size={14} className={`transition-all duration-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                </motion.button>
                            );
                        })
                    ) : (
                        <div className="p-4 text-center text-[var(--text-secondary)] text-xs italic">
                            No programs found
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
                    <div className="p-4 bg-[var(--accent-primary)]/5 rounded-2xl border border-[var(--accent-primary)]/10">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen size={16} className="text-[var(--accent-primary)]" />
                            <span className="text-xs font-bold text-[var(--text-primary)]">Resource View</span>
                        </div>
                        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                            Click any item to load the deep-slate source code and layouts.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
