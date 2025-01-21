import React, { useState } from "react";
import DayPicker from "../components/daypicker/DayPicker";

const SelectDatePage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="w-full h-[calc(100vh-56px)] relative bg-gray bg-opacity-30">
      <div className="absolute inset-0 flex justify-center items-center">
        <DayPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};

export default SelectDatePage;
