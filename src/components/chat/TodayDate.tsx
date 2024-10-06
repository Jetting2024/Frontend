import React, { useEffect, useState } from "react";

const TodayDate: React.FC = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('ko-kr', options);
    setToday(formattedDate);
  }, []);
  
  return (
    <div className="flex justify-center items-center mx-10 my-4">
      <div className="flex flex-grow border-b-[1.5px] border-[#3d3d3d] border-opacity-20" />
      <div className="mx-8 text-[#3d3d3d] text-[12px] text-opacity-80">{today}</div>
      <div className="flex flex-grow border-b-[1.5px] border-[#3d3d3d] border-opacity-20" />
    </div>
  );
};

export default TodayDate;
