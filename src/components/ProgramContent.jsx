import React, { useState, useEffect, useMemo } from 'react';
import CodeBlock from './CodeBlock';
import PhonePreview from './PhonePreview';
import IntroVideo from './IntroVideo';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Terminal, Loader2 } from 'lucide-react';
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
            }, 1000); // 1 second loading animation
            return () => clearTimeout(timer);
        }
    }, [program?.id]);

    if (!program) return (
        <div className="flex-1 flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500">Select a program to view details</p>
            </div>
        </div>
    );

    return (
        <main className="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-80px)]">
            <AnimatePresence mode="wait">
                {viewState === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 min-h-[400px]"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
                            <Loader2 className="absolute top-0 left-0 w-16 h-16 text-indigo-500 animate-spin" />
                        </div>
                        <p className="mt-4 text-gray-500 font-medium animate-pulse">Initializing Lab Environment...</p>
                    </motion.div>
                )}

                {viewState === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-3xl mx-auto py-10"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Intro: {program.title}</h3>
                            <p className="text-gray-500 text-sm">Review the program overview before accessing the code.</p>
                        </div>
                        <IntroVideo
                            src={videoSrc}
                            onVideoEnd={() => setViewState('content')}
                        />
                    </motion.div>
                )}

                {viewState === 'content' && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="mb-10 flex flex-col lg:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4"
                                >
                                    {program.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
                                >
                                    {program.description}
                                </motion.p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">Android Studio</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">Java</span>
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">XML</span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="w-full lg:w-auto flex flex-col items-center gap-2"
                            >
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Visual Mockup</span>
                                <PhonePreview programId={program.id} />
                            </motion.div>
                        </div>

                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <CodeBlock
                                    code={program.xml}
                                    language="xml"
                                    title="activity_main.xml"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
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

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 text-sm pb-8">
                © 2026 Android Lab Programs Portal • Built with ❤️
            </footer>
        </main>
    );
};

export default ProgramContent;
