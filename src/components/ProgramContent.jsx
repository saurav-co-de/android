import React, { useState, useEffect, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import PhonePreview from './PhonePreview';
import IntroVideo from './IntroVideo';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Terminal, Loader2, Sparkles, Layout, Database } from 'lucide-react';
import sukonaVideo from '../assets/sukona.mp4';
import program1Video from '../assets/program1.mp4';
import program2Video from '../assets/program2.mp4';
import program3Video from '../assets/program3.mp4';
import program4Video from '../assets/program4.mp4';
import program5Video from '../assets/program5.mp4';
import program6Video from '../assets/program6.mp4';

const ProgramContent = ({ program }) => {
    const [viewState, setViewState] = useState('loading'); // 'loading' | 'video' | 'content'

    const videoSrc = useMemo(() => {
        switch (program?.id) {
            case 1: return program1Video;
            case 2: return program2Video;
            case 3: return program3Video;
            case 4: return program4Video;
            case 5: return program5Video;
            case 6: return program6Video;
            default: return sukonaVideo;
        }
    }, [program?.id]);

    useEffect(() => {
        if (program) {
            setViewState('loading');
            const timer = setTimeout(() => {
                setViewState('video');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [program?.id]);

    if (!program) return (
        <div className="flex-1 flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center p-12 glass-effect rounded-[2.5rem] border border-[var(--border-subtle)] shadow-2xl">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-indigo-500/20">
                    <BookOpen className="text-[var(--accent-primary)]" size={40} />
                </div>
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">Ready to explore?</h2>
                <p className="text-[var(--text-secondary)] font-medium max-w-xs mx-auto">Select a program from the library to explore the Android source code.</p>
            </div>
        </div>
    );

    return (
        <main className="flex-1 p-4 lg:p-10 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)]">
            <AnimatePresence mode="wait">
                {viewState === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 min-h-[500px]"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-24 h-24 bg-[var(--accent-primary)]/10 rounded-full absolute -top-4 -left-4 blur-2xl"
                            />
                            <div className="w-16 h-16 border-4 border-[var(--accent-primary)]/10 rounded-full"></div>
                            <Loader2 className="absolute top-0 left-0 w-16 h-16 text-[var(--accent-primary)] animate-spin" />
                        </div>
                        <p className="mt-6 text-[var(--text-primary)] text-lg font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
                            Synthesizing Code...
                        </p>
                    </motion.div>
                )}

                {viewState === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        className="max-w-4xl mx-auto py-10"
                    >
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] font-black uppercase tracking-widest mb-4">
                                <Sparkles size={12} /> Live Preview
                            </div>
                            <h3 className="text-4xl font-black text-[var(--text-primary)] mb-3 tracking-tight">
                                {program.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] font-medium">Watch the implementation overview before diving into the architecture.</p>
                        </div>
                        <div className="p-1 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-[2rem]">
                            <IntroVideo
                                src={videoSrc}
                                onVideoEnd={() => setViewState('content')}
                            />
                        </div>
                    </motion.div>
                )}

                {viewState === 'content' && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="mb-14 flex flex-col lg:flex-row gap-12 items-start">
                            <div className="flex-1 space-y-6">
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 mb-4"
                                    >
                                        <div className="h-0.5 w-8 bg-[var(--accent-primary)] rounded-full" />
                                        <span className="text-xs font-black text-[var(--accent-primary)] uppercase tracking-widest">Documentation</span>
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-5xl font-black text-[var(--text-primary)] mb-6 tracking-tight leading-[1.1]"
                                    >
                                        {program.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed"
                                    >
                                        {program.description}
                                    </motion.p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <div className="px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-black rounded-xl flex items-center gap-2 shadow-sm uppercase tracking-wider transition-transform hover:scale-105">
                                        <Layout size={14} className="text-indigo-500" /> Android Studio
                                    </div>
                                    <div className="px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-black rounded-xl flex items-center gap-2 shadow-sm uppercase tracking-wider transition-transform hover:scale-105">
                                        <Database size={14} className="text-emerald-500" /> Java / XML
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                className="w-full lg:w-auto p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 rounded-[3rem] border border-white/10 shadow-2xl"
                            >
                                <PhonePreview programId={program.id} />
                                <div className="mt-4 text-center">
                                    <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] opacity-50">Interactive Mockup</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <CodeBlock
                                    code={program.xml}
                                    language="xml"
                                    title="activity_main.xml"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <CodeBlock
                                    code={program.java}
                                    language="java"
                                    title="MainActivity.java"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="mt-24 pt-10 border-t border-[var(--border-subtle)] text-center pb-12">
                <p className="text-[var(--text-secondary)] text-xs font-black uppercase tracking-[0.3em] opacity-50">
                    Android Lab Programs Portal • 2026
                </p>
            </footer>
        </main>
    );
};

export default ProgramContent;
