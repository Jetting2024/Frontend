import React, { useState } from "react";
import TimeButton from "./TimeButton";

interface SelectTimeProps {
    onSelect: (time: string | null, hour: string | null, minute: string | null) => void;
  }

const SelectTime : React.FC<SelectTimeProps> = ({ onSelect }) => {
    
    const [selectedTimeButton, setSelectedTimeButton] = useState<string | null>(null);
    const [selectedHourButton, setSelectedHourButton] = useState<string | null>(null);
    const [selectedMinuteButton, setSelectedMinuteButton] = useState<string | null>(null);

    const handleTimeButtonClick = (time: string) => {
        setSelectedTimeButton(time);
        onSelect(time, null, null);
    };

    const handleHourButtonClick = (hour: string) => {
        setSelectedHourButton(hour);
        onSelect(null, hour, null);
    };

    const handleMinuteButtonClick = (minute: string) => {
        setSelectedMinuteButton(minute);
        onSelect(null, null, minute);
    }

    return (
        <>
            <div className="relative flex flex-row h-[200px] w-48 rounded-[0.5rem] border border-black-100">
                <div className="w-16 h-[200px] overflow-y-auto scrollbar-hide">
                {['오전', '오후', ''].map((item, index) => (
                    <TimeButton key={index} label={item} isSelected={selectedTimeButton === item} onClick={() => handleTimeButtonClick(item)}/>
                ))}
                </div>
                <div className="w-16 h-[200px] overflow-y-auto scrollbar-hide">
                {['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map((item, index) => (
                    <TimeButton key={index} label={item} isSelected={selectedHourButton === item} onClick={() => handleHourButtonClick(item)}/>
                ))}
                </div>
                <div className="w-16 h-[200px] overflow-y-auto scrollbar-hide">
                {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((item, index) => (
                    <TimeButton key={index} label={item} isSelected={selectedMinuteButton === item} onClick={() => handleMinuteButtonClick(item)}/>
                ))}
                </div>
            </div>
        </>
    );
}

export default SelectTime;