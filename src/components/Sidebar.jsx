import React from 'react';

const Sidebar = ({ programs, activeId, setActiveId, searchQuery, setSearchQuery, isOpen, setIsOpen }) => {
    return (
        <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Android Portal</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-semibold">Lab Programs</p>
                </div>

                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search programs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                    />
                </div>

                <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
                    {programs.length > 0 ? (
                        programs.map((program) => (
                            <button
                                key={program.id}
                                onClick={() => {
                                    setActiveId(program.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-start gap-3 group ${activeId === program.id
                                        ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-100 dark:border-indigo-800'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs ${activeId === program.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600'
                                    }`}>
                                    {program.id}
                                </span>
                                <span className="leading-tight">{program.title}</span>
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm italic">
                            No programs found
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
