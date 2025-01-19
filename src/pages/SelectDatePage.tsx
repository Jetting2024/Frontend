import React, { useState } from "react";
import DayPicker from "../components/daypicker/DayPicker";
import { useNavigate } from "react-router-dom";

const SelectDatePage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    navigate('/make-room');
  };

  return (
    <div className="w-full h-screen relative bg-gray bg-opacity-30">
      <div className="absolute inset-0 flex justify-center items-center">
        <DayPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default SelectDatePage;
