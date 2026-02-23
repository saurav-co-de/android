import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeBlock = ({ code, language, title }) => {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, isOpen]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success(`${title} copied to clipboard!`);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            <div
                className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700/50 cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                    <span className="font-semibold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
                        {title}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard();
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-400"
                    title="Copy Code"
                >
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
            </div>

            {isOpen && (
                <div className="relative group">
                    <pre className={`!m-0 !rounded-none !bg-transparent language-${language}`}>
                        <code className={`language-${language}`}>{code}</code>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CodeBlock;
