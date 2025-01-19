import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DayPicker from "../components/daypicker/DayPicker";

const DayPickerPage: React.FC = () => {
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

    const formattedStartDate = startDate.toLocaleDateString("en-CA");
    const formattedEndDate = endDate.toLocaleDateString("en-CA");

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
        navigate("/invite", { state: { travelId: data.travelId } });
      } else {
        alert("여행 생성 실패");
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
