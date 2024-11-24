import React, { useState, useEffect, useCallback } from "react";
import { FaAngleRight } from "react-icons/fa";
import SelectTime from "./SelectTime";

interface TimePickerProps {
  onChange: (startTime: string, endTime: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
  const [selectedStart, setSelectedStart] = useState(false);
  const [selectedEnd, setSelectedEnd] = useState(false);

  const [timeData, setTimeData] = useState({
    startTime: "선택",
    startHour: "00",
    startMinute: "00",
    endTime: "선택",
    endHour: "00",
    endMinute: "00",
  });

  const handleStartClick = () => {
    setSelectedStart((prev) => !prev);
    setSelectedEnd(false);
  };

  const handleEndClick = () => {
    setSelectedEnd((prev) => !prev);
    setSelectedStart(false);
  };

  const handleSelectTime = useCallback(
    (
      time: string | null,
      hour: string | null,
      minute: string | null,
      type: "start" | "end"
    ) => {
      setTimeData((prev) => ({
        ...prev,
        ...(type === "start"
          ? {
              startTime: time || prev.startTime,
              startHour: hour || prev.startHour,
              startMinute: minute || prev.startMinute,
            }
          : {
              endTime: time || prev.endTime,
              endHour: hour || prev.endHour,
              endMinute: minute || prev.endMinute,
            }),
      }));
    },
    []
  );

  // 시간 데이터 변경 시 부모 컴포넌트로 전달 (Debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(
        `${timeData.startTime} ${timeData.startHour}:${timeData.startMinute}`,
        `${timeData.endTime} ${timeData.endHour}:${timeData.endMinute}`
      );
    }, 100); // 100ms debounce

    return () => clearTimeout(timer); // Cleanup on unmount or before re-run
  }, [timeData, onChange]);

  return (
    <div className="relative flex flex-row w-96 h-10 items-center mx-2 my-2 rounded-[0.5rem] border border-black-100">
      <FaAngleRight className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* 시작 시간 */}
      <div className="flex flex-col relative">
        <div
          onClick={handleStartClick}
          className="flex flex-row justify-center items-center w-48 h-10 px-4 cursor-pointer"
        >
          <button className="flex-1">{timeData.startTime}</button>
          <button className="flex-1">{timeData.startHour}</button>
          <div className="w-2">:</div>
          <button className="flex-1">{timeData.startMinute}</button>
        </div>

        {selectedStart && (
          <div className="absolute top-12 bg-white">
            <SelectTime
              onSelect={(time, hour, minute) =>
                handleSelectTime(time, hour, minute, "start")
              }
            />
          </div>
        )}
      </div>

      {/* 종료 시간 */}
      <div className="flex flex-col relative">
        <div
          onClick={handleEndClick}
          className="flex flex-row justify-center items-center w-48 h-10 px-4 cursor-pointer"
        >
          <button className="flex-1">{timeData.endTime}</button>
          <button className="flex-1">{timeData.endHour}</button>
          <div className="w-2">:</div>
          <button className="flex-1">{timeData.endMinute}</button>
        </div>

        {selectedEnd && (
          <div className="absolute top-12">
            <SelectTime
              onSelect={(time, hour, minute) =>
                handleSelectTime(time, hour, minute, "end")
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
