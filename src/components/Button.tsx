import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ElementType;
    size?: number;
    color?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    icon: Icon,
    size: iconSize = 24, // 기본 아이콘 크기 설정
    color = 'bg-blue-400', // 기본 배경색 설정
    onClick,
    disabled,
  }) => {
    return (
      <button
        className={`flex justify-center items-center w-[380px] h-[48px] rounded-lg ${color} text-white font-medium text-sm
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {Icon && (
          <div className="flex items-center justify-center mr-2">
            <Icon size={iconSize} />
          </div>
        )}
        {children}
      </button>
    );
  };
  
  export default Button;