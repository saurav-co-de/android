import React from 'react';
import { motion } from 'framer-motion';

const PhonePreview = ({ programId }) => {
    // Simplified UI mockups for each lab
    const renderPreview = () => {
        switch (programId) {
            case 1: // Hello World
                return (
                    <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900 border-2 border-indigo-500/30 rounded-lg p-4">
                        <span className="text-xl font-bold animate-pulse text-indigo-500">Hello World</span>
                    </div>
                );
            case 2: // Simple Calculator
                return (
                    <div className="flex flex-col gap-2 p-4 pt-8 bg-gray-50 dark:bg-gray-900 h-full rounded-lg">
                        <div className="h-10 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"></div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="h-10 bg-indigo-500 rounded text-white flex items-center justify-center font-bold">+</div>
                            <div className="h-10 bg-indigo-500 rounded text-white flex items-center justify-center font-bold">-</div>
                            <div className="h-10 bg-indigo-500 rounded text-white flex items-center justify-center font-bold">*</div>
                            <div className="h-10 bg-indigo-500 rounded text-white flex items-center justify-center font-bold">/</div>
                        </div>
                    </div>
                );
            case 6: // Date/Time Picker
                return (
                    <div className="flex flex-col items-center justify-center gap-4 h-full bg-white dark:bg-gray-900 rounded-lg">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 font-bold">12 / 06 / 2024</div>
                        <div className="w-16 h-8 bg-indigo-500 rounded-full"></div>
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold">14:30 PM</div>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800/50 rounded-lg italic text-gray-400 text-xs">
                        UI Preview Loading...
                    </div>
                );
        }
    };

    return (
        <div className="relative mx-auto border-gray-800 dark:border-gray-700 bg-gray-800 border-[7px] rounded-[1.5rem] h-[300px] w-[160px] shadow-2xl overflow-hidden scale-90 lg:scale-100 group">
            {/* Top Speaker/Camera */}
            <div className="h-[12px] w-[60px] bg-gray-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[10px] z-20"></div>

            {/* Screen */}
            <div className="h-full w-full bg-white dark:bg-gray-900 z-10 p-1">
                <div className="h-full w-full rounded-[1rem] overflow-hidden border border-gray-200 dark:border-gray-800">
                    {renderPreview()}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-[4px] w-[50px] bg-gray-500 absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full z-20 opacity-40"></div>

            {/* Visual Flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30"></div>
        </div>
    );
};

export default PhonePreview;
