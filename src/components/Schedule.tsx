import React, { useState, useRef, useCallback, useEffect } from "react";
import { format, differenceInDays, addDays } from "date-fns"; // date-fns 사용
import AlertModal from "../components/AlertModal";
import TimePicker from "../components/timeSetModal/TimePicker";

interface ScheduleProps {
  isOwner: boolean;
  scheduleData: ScheduleItem[]; // 일정 데이터 구조
  addLocation: () => void;
}

interface ScheduleItem {
  id: number;
  photo: string;
  title: string;
  time: string;
  location: string;
}

const Schedule: React.FC<ScheduleProps> = ({
  isOwner,
  scheduleData,
  addLocation,
}) => {
  const [participants, setParticipants] = useState(["하은", "재혁"]); // 참여자 리스트
  const [tripTitle, setTripTitle] = useState("두근두근 후꾸까가까"); // 여행 제목
  const [tripDates, setTripDates] = useState("2024-11-05 ~ 2024-11-09"); // 여행 날짜
  const [dayLabels, setDayLabels] = useState<string[]>([]); // "n일차" 텍스트 배열

  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 열림 상태
  const [modalType, setModalType] = useState(""); // 수정할 항목을 저장 (참여자, 제목, 날짜)
  const [editValue, setEditValue] = useState(""); // 수정할 값

  const [displayedData, setDisplayedData] = useState<ScheduleItem[]>(
    scheduleData.slice(0, 10)
  );
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [timePickerVisible, setTimePickerVisible] = useState<{
    [id: number]: boolean;
  }>({});
  const [tempTimeData, setTempTimeData] = useState<{
    [id: number]: { startTime: string; endTime: string };
  }>({});
  const [finalTimeData, setFinalTimeData] = useState<{
    [id: number]: { startTime: string; endTime: string };
  }>({});

  const toggleTimePicker = (id: number) => {
    if (timePickerVisible[id]) {
      const savedTime = tempTimeData[id] || {
        startTime: "설정되지 않음",
        endTime: "설정되지 않음",
      };
      setFinalTimeData((prev) => ({
        ...prev,
        [id]: savedTime,
      }));

      const time = `${savedTime.startTime} ~ ${savedTime.endTime}`;
      console.log(`ID ${id} 저장된 시간: ${time}`); // 콘솔 출력
    }

    setTimePickerVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTimeChange = (id: number, startTime: string, endTime: string) => {
    setTempTimeData((prev) => ({
      ...prev,
      [id]: { startTime, endTime },
    }));
  };

  //무한 스크롤 함수
  const loadMoreItems = useCallback(() => {
    const nextItems = scheduleData.slice(page * 10, (page + 1) * 10);
    if (nextItems.length > 0) {
      setDisplayedData((prev) => [...prev, ...nextItems]);
      setPage((prev) => prev + 1);
    }
  }, [page, scheduleData]);

  // 마지막 아이템을 감지하는 Ref
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loadMoreItems]
  );

  // 편집 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // 편집 모드 상태를 토글
  };

  // 여행 정보 수정 모달 열기
  const openEditModal = (type: string) => {
    setModalType(type);
    if (type === "peoples") {
      setEditValue(participants.join(", "));
    } else if (type === "title") {
      setEditValue(tripTitle);
    } else if (type === "dates") {
      setEditValue(tripDates);
    }
    setIsEditModalOpen(true);
  };

  // 수정 확인 버튼 클릭 시 실행
  const handleConfirmEdit = () => {
    if (modalType === "peoples") {
      setParticipants(editValue.split(", "));
    } else if (modalType === "title") {
      setTripTitle(editValue);
    } else if (modalType === "dates") {
      setTripDates(editValue);
    }
    setIsEditModalOpen(false);
  };

  // 날짜별 "n일차" 생성 로직
  useEffect(() => {
    const [start, end] = tripDates.split(" ~ ").map((date) => new Date(date));
    const numDays = differenceInDays(end, start) + 1;

    const labels = Array.from({ length: numDays }, (_, i) =>
      format(addDays(start, i), "yyyy-MM-dd")
    );

    setDayLabels(labels); // 상태 업데이트
  }, [tripDates]);

  return (
    <div className="container mx-auto p-4 h-screen overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 relative">
        {/* 편집 모드가 아닌 경우 "편집하기" 버튼 표시 */}
        {isOwner && !isEditMode && (
          <button
            onClick={toggleEditMode}
            className="absolute text-gray top-4 right-4 hover:text-black hover:underline"
          >
            편집하기
          </button>
        )}
        {isOwner && isEditMode && (
          <div className="absolute top-4 right-4 flex gap-2">
            {/* 나중에 수정 */}
            <button
              onClick={() => openEditModal("peoples")}
              className="px-4 py-1 bg-lightgray text-gray rounded-lg hover:text-black"
            >
              멤버 수정
            </button>

            <button
              onClick={() => openEditModal("title")}
              className="px-4 py-1 bg-lightgray text-gray rounded-lg hover:text-black"
            >
              제목 수정
            </button>

            <button
              onClick={() => openEditModal("dates")}
              className="px-4 py-1 bg-lightgray text-gray rounded-lg hover:text-black"
            >
              날짜 수정
            </button>
          </div>
        )}

        {/* 수정 모달 */}
        <AlertModal
          isOpen={isEditModalOpen}
          title={`${
            modalType === "participants"
              ? "참여자 수정"
              : modalType === "title"
                ? "제목 수정"
                : "날짜 수정"
          }`}
          message={
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          }
          confirmText="수정"
          onConfirm={handleConfirmEdit}
          onClose={() => setIsEditModalOpen(false)}
        />

        <div className="mb-4 mt-8 text-center">
          <p>{participants.join(", ")}의</p>
          <h2 className="text-2xl font-bold">{tripTitle}</h2>
          <p className="text-gray text-sm mt-2">{tripDates}</p>
        </div>

        <div className="divide-y divide-gray mt-8">
          {dayLabels.map((dayLabel, index) => (
            <div key={index} className="py-8">
              <h3 className="text-lg font-bold">{index + 1}일차</h3>
              <p className="text-sm text-gray">{dayLabel}</p>
              <div className="flex flex-col gap-4 mt-2">
                {/* 각 날짜에 해당하는 세부 일정 표시 */}
                {scheduleData
                  .filter((item) => item.id === index) // 날짜별 데이터 필터링
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-4 mt-2">
                      {/* 썸네일 */}
                      <div className="flex flex-col gap-1 w-full">
                        {/* 가게 이름, 시간 */}
                        <div className="flex items-center justify-between">
                          <p className="text-[18px] font-bold">{item.title}</p>
                          {isOwner && (
                            <button
                              onClick={() => toggleTimePicker(item.id)}
                              className="text-sm text-gray  hover:text-black"
                            >
                              {finalTimeData[item.id]
                                ? `${finalTimeData[item.id].startTime} ~ ${finalTimeData[item.id].endTime}`
                                : "시간 선택"}
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray">{item.location}</p>

                        {/* TimePicker (시간 선택 팝업) */}
                        {timePickerVisible[item.id] && (
                          <div className="flex items-center justify-center mt-4">
                            <div>
                              <TimePicker
                                onChange={(startTime, endTime) =>
                                  handleTimeChange(item.id, startTime, endTime)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {isOwner && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={addLocation}
                      className="w-full py-1 rounded-lg text-sm border border-gray hover:bg-black hover:text-white"
                    >
                      장소 추가
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={lastItemRef} className="h-1" />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
