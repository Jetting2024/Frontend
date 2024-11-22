import React from "react";
import DayPicker from "../components/daypicker/DayPicker";

const DayPickerPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[900px] h-[700px] p-6 bg-white rounded-2xl shadow-2xl">
        <DayPicker />
      </div>
    </div>
  );
};

export default DayPickerPage;
