import React from 'react';

export default function Dialog({ title, btnTitle, children, isOpen, setIsOpen }) {
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow text-sm"
            >
                {btnTitle}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                    ></div>

                    <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 overflow-hidden transform transition-all border border-gray-100">

                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            {children}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
