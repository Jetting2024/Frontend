import React, { useState } from "react";

interface ScheduleProps {
  isOwner: boolean;
  scheduleData: ScheduleItem[]; // 일정 데이터 구조
}

interface ScheduleItem {
  id: number;
  photo: string;
  title: string;
  time: string;
  location: string;
}

const Schedule: React.FC<ScheduleProps> = ({ isOwner, scheduleData }) => {
  const [participants, setParticipants] = useState(["하은", "재혁"]); // 참여자 리스트
  const [tripTitle, setTripTitle] = useState("두근두근 후꾸까가까"); // 여행 제목
  const [tripDates, setTripDates] = useState("2024-11-05 ~ 2024-11-09"); // 여행 날짜

  // 여행 정보 수정 함수
  const handleTripEdit = () => {
    const newParticipants = prompt(
      "참여자 리스트를 수정하세요",
      participants.join(", ")
    );
    const newTripTitle = prompt("여행 제목을 수정하세요", tripTitle);
    const newTripDates = prompt("여행 날짜를 수정하세요", tripDates);

    if (newParticipants) setParticipants(newParticipants.split(", "));
    if (newTripTitle) setTripTitle(newTripTitle);
    if (newTripDates) setTripDates(newTripDates);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray rounded-2xl p-8 relative">
        {/* Owner만 수정 버튼 표시 */}
        {isOwner && (
          <button
            className="absolute top-4 right-4 text-sm text-gray hover:underline"
            onClick={handleTripEdit}
          >
            편집하기
          </button>
        )}
        <div className="mb-4 mt-8 text-center">
          <p>{participants.join(", ")}의</p>
          <h2 className="text-2xl font-bold">{tripTitle}</h2>
          <p className="text-gray text-sm mt-2">{tripDates}</p>
        </div>

        {/* 일정 목록 표시 */}
        <div className="divide-y divide-gray mt-8">
          {scheduleData.map((item, index) => (
            <div key={item.id} className="py-8">
              <h3 className="text-lg font-bold">{index + 1}일차</h3>
              <div className="flex items-center gap-4 mt-2">
                {/* 썸네일 */}
                <div className="w-16 h-16 bg-gray rounded-lg"></div>
                <div className="flex flex-col gap-1 w-full">
                  {/* 가게 이름, 시간 */}
                  <div className="flex">
                    <p className="text-[18px] font-bold">{item.title}</p>
                    <p className="text-[12px] text-gray ml-2 mt-2">
                      {item.time}
                    </p>
                  </div>
                  <p className="text-sm text-gray">{item.location}</p>
                </div>
              </div>
              {isOwner && (
                <div className="mt-6 text-center">
                  <button className="w-full py-1 rounded-lg  text-sm border border-gray hover:bg-black hover:text-white">
                    장소 추가
                  </button>
                  {/* <button className="ml-4 px-12 py-1 rounded-lg  text-sm border border-gray hover:bg-black hover:text-white">
                    일정 추가
                  </button> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// MainPage에서 일정 컴포넌트를 사용하려면 scheduleData를 전달
// const MainPage: React.FC = () => {
//   const scheduleData = [
//     { id: 1, title: "제주도 도착", time: "10:00 AM", location: "제주공항" },
//     { id: 2, title: "점심식사", time: "12:00 PM", location: "현지식당" },
//     { id: 3, title: "한라산 등반", time: "3:00 PM", location: "한라산" },
//   ];

//   return (
//     <div>
//       <Schedule isOwner={true} scheduleData={scheduleData} />
//     </div>
//   );

// };

export default Schedule;
