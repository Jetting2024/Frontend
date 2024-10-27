import React from 'react';

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <div className="w-1/2 relative">
        <button
            className={`w-full flex justify-start text-[1.5rem] font-bold relative ${
            isActive ? 'text-[#509FE8]' : 'text-black'
            }`}
            onClick={onClick}
        >
            {label}
        </button>
        <div
            className={`absolute bottom-0 left-0 w-full h-1 bg-[#509FE8] transform scale-x-0 origin-left transition-transform duration-500 ${
            isActive ? 'scale-x-100' : ''
            } hover:scale-x-100`}
        ></div>
        </div>
    );
};

export default TabButton;
