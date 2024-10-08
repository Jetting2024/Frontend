import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import SelectTime from "./SelectTime";

// interface TimePickerProps {
//   onClick: () => void;
// }

const TimePicker: React.FC = () => {
  const [selectedStart, setSelectedStart] = useState(false);
  const [selectedEnd, setSelectedEnd] = useState(false);

  const [startTime, setStartTime] = useState("선택");
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");

  const [endTime, setEndTime] = useState("선택");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");
  
  const handleStartClick = () => {
    setSelectedStart(!selectedStart);
    setSelectedEnd(false);
  };

  const handleEndClick = () => {
    setSelectedEnd(!selectedEnd);
    setSelectedStart(false);
  };

  const handleSelectTime = (time: string | null, hour: string | null, minute: string | null, type: "start" | "end") => {
    if(type === "start") {
      if (time !== null) setStartTime(time);
      if (hour !== null) setStartHour(hour);
      if (minute !== null) setStartMinute(minute);
    } else {
      if (time !== null) setEndTime(time);
      if (hour !== null) setEndHour(hour);
      if (minute !== null) setEndMinute(minute);
    }
  };

  return (
    <div className="relative flex flex-row w-96 h-10 items-center mx-2 my-2 rounded-[0.5rem] border border-black-100">
      <FaAngleRight className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className=" flex flex-col relative">
        <div
          onClick={handleStartClick}
          className="flex flex-row justify-center items-center w-48 h-10 px-4 cursor-pointer"
        >
          <button className="flex-1">{startTime}</button>
          <button className="flex-1">{startHour}</button>
          <div className="w-2">:</div>
          <button className="flex-1">{startMinute}</button>
        </div>

        {selectedStart && (
          <div className=" absolute top-12">
            <SelectTime onSelect={(time, hour, minute) => handleSelectTime(time, hour, minute, "start")} />
          </div>
        )}
      </div>

      <div className=" flex flex-col relative">
        <div
          onClick={handleEndClick}
          className="flex flex-row justify-center items-center w-48 h-10 px-4 cursor-pointer"
        >
          <button className="flex-1">{endTime}</button>
          <button className="flex-1">{endHour}</button>
          <div className="w-2">:</div>
          <button className="flex-1">{endMinute}</button>
        </div>

        {selectedEnd && (
          <div className=" absolute top-12">
            <SelectTime onSelect={(time, hour, minute) => handleSelectTime(time, hour, minute, "end")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
