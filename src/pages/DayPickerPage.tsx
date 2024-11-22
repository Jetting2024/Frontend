import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DayPicker from "../components/daypicker/DayPicker";

const DayPickerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { travelName } = location.state as { travelName: string };
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const createTravel = async () => {
    if (!startDate || !endDate) {
      alert("날짜를 선택하세요");
      return;
    }

    const formattedStartDate = startDate.toLocaleDateString("en-CA"); // "yyyy-mm-dd"
    const formattedEndDate = endDate.toLocaleDateString("en-CA"); // "yyyy-mm-dd"

    console.log("Formatted Start Date:", formattedStartDate);
    console.log("Formatted End Date:", formattedEndDate);

    try {
      const response = await fetch("/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelName,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("여행 생성 성공:", data);
        navigate("/invite", { state: { travelId: data.travelId } });

        console.log("선택된 날짜", formattedStartDate, "-", formattedEndDate);
      } else {
        alert("여행 생성 실패");
        console.log("선택된 날짜", travelName);
        console.log("선택된 날짜", formattedStartDate, "-", formattedEndDate);
      }
    } catch (error) {
      console.error("API 요청 중 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[900px] h-[700px] p-6 bg-white flex justify-center items-center">
        <DayPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onConfirm={createTravel}
        />
      </div>
    </div>
  );
};

export default DayPickerPage;
