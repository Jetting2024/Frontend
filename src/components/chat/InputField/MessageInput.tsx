import React, { useState } from "react";
import { LuSend } from "react-icons/lu";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  }
  return (
    <div className="w-full h-12 flex justify-between items-center pl-4 pr-2 border-[1.5px] border-black border-opacity-30 rounded-full">
      <input
        className="w-full h-10 outline-none "
        placeholder="메세지를 입력해주세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button 
        className="w-8 h-8 pr-[1.8px] pt-[1px] ml-2 rounded-full bg-[#3d3d3d] flex justify-center items-center hover:bg-black"
        onClick={(e) => handleSend()}>
        
        <LuSend size={16} stroke="#fff"/>
      </button>
    </div>
  );
};

export default MessageInput;
