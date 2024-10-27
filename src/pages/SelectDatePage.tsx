import React from "react";
import DayPicker from "../components/daypicker/DayPicker";
import Navbar from "../components/Navbar";

const SelectDatePage: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-gray bg-opacity-30">
      <Navbar />
      <div className=" absolute inset-0 flex justify-center items-center">
        <DayPicker />
      </div>
    </div>
  );
};

export default SelectDatePage;
