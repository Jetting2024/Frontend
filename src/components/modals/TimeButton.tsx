import React, { useState } from "react";

interface TimeButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeButton: React.FC<TimeButtonProps> = ({ label, isSelected, onClick }) => {

  return (
    <button
      onClick={onClick}
      className={`w-16 h-8 flex items-center justify-center font-bold text-[0.85rem] ${
        isSelected ? "bg-[#C2DDF7]" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default TimeButton;
