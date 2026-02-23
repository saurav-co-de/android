import React from 'react';
import CodeBlock from './CodeBlock';
import { BookOpen, Terminal } from 'lucide-react';

const ProgramContent = ({ program }) => {
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
        <main className="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        Program {program.id}
                    </span>
                </div>
                <h2 className="text-3xl font-extrabold mb-4 tracking-tight">{program.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
                    {program.description}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <section>
                    <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                        <Terminal size={20} />
                        <h3 className="text-xl font-bold">Implementation</h3>
                    </div>

                    <CodeBlock
                        title="activity_main.xml"
                        language="xml"
                        code={program.xml}
                    />

                    <CodeBlock
                        title="MainActivity.java"
                        language="java"
                        code={program.java}
                    />
                </section>
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 text-sm pb-8">
                © 2026 Android Lab Programs Portal • Built with ❤️
            </footer>
        </main>
    );
};

export default ProgramContent;
