import { styled } from 'styled-components';
import React from 'react';

interface TextFieldProps {
    type: string;
    icon?: React.ElementType;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const TextField: React.FC<TextFieldProps> = ({
    type,
    icon: Icon,
    placeholder,
    value,
    onChange,
    name
  }) => {
    return (
      <div className="w-[364px] h-[48px] flex items-center border rounded-lg pl-4 border-gray-300 focus-within:border-blue-400 hover:border-blue-400">
        {Icon && (
          <div className="flex items-center justify-center mr-2">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="flex-1 h-full border-none outline-none bg-transparent text-base"
        />
      </div>
    );
  };
  
  export default TextField;