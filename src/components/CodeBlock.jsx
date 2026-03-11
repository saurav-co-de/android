import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import { Copy, Check, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
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
        <div className="mb-8 premium-card overflow-hidden group/card shadow-xl shadow-black/5">
            <div
                className="flex items-center justify-between px-5 py-3.5 bg-[var(--bg-surface)]/50 backdrop-blur-md border-b border-[var(--border-subtle)] cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)]'}`}>
                        <Code2 size={16} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-[0.15em] text-[var(--text-primary)]">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard();
                        }}
                        className="p-2 rounded-xl hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] transition-all text-[var(--text-secondary)]"
                        title="Copy Code"
                    >
                        {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                    <div className={`p-1.5 rounded-lg transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`}>
                        <ChevronDown size={18} className="text-[var(--text-secondary)]" />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="relative group overflow-x-auto custom-scrollbar">
                    <pre className={`!m-0 !p-6 !bg-transparent language-${language} selection:bg-[var(--accent-primary)]/30`}>
                        <code className={`language-${language}`}>{code}</code>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CodeBlock;
