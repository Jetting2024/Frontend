import React, { useState, useRef, useCallback, useEffect } from "react";
import { format, differenceInDays, addDays } from "date-fns"; // date-fns 사용
import AlertModal from "../components/AlertModal";
import TimePicker from "../components/timeSetModal/TimePicker";
import DirectInputButton from "../components/DirectInputButton";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import Search from "../components/NaverMap/Search";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface ScheduleProps {
  isOwner: boolean;
  scheduleData: ScheduleItem[]; // 일정 데이터 구조
  addLocation: () => void;
}

interface ScheduleItem {
  id: number;
  title: string;
  time: string;
  location: string;
}

const Schedule: React.FC<{
  isOwner: boolean;
  // toggleSearch: (dayIndex: number) => void;
}> = ({ isOwner }) => {
  const location = useLocation();
  const { roomName, startDate, endDate } = location.state || {};

  const [participants, setParticipants] = useState<string[]>(["하은", "재혁"]); // 초기값 임시 설정
  const [tripTitle, setTripTitle] = useState(roomName || "새로운 여행");
  const [tripDates, setTripDates] = useState("");

  const [dayLabels, setDayLabels] = useState<string[]>([]); // "n일차"

  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editValue, setEditValue] = useState("");

  const [scheduleData, setScheduleData] = useState<ScheduleItem[][]>([]); // 날짜별 일정 데이터
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // const handleAddLocation = (dayIndex: number) => {
  //   toggleSearch(dayIndex); // 검색 세션 열기
  //   setSelectedDayIndex(dayIndex); // 선택한 날짜 저장
  // };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🔥 검색 세션 열기/닫기 함수
  const toggleSearch = (dayIndex: number) => {
    setIsSearchOpen(!isSearchOpen);
    setSelectedDayIndex(dayIndex);
  };

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
      console.log(`ID ${id} 저장된 시간: ${time}`); // 콘솔
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

  const loadMoreItems = useCallback(() => {
    const allItems = scheduleData.flat(); // 평탄화된 배열 가져오기
    const nextItems = allItems.slice(page * 10, (page + 1) * 10); // 다음 항목 가져오기

    if (nextItems.length > 0) {
      const newScheduleData = [...allItems, ...nextItems]; // 기존 + 추가된 항목

      // 배열을 날짜별로 그룹화하여 ScheduleItem[][] 형식으로 변환
      const groupedData: ScheduleItem[][] = [];
      newScheduleData.forEach((item) => {
        const dayIndex = Math.floor((item.id - 1) / 10); // 날짜 그룹화 기준
        if (!groupedData[dayIndex]) {
          groupedData[dayIndex] = [];
        }
        groupedData[dayIndex].push(item);
      });

      setScheduleData(groupedData); // ScheduleItem[][]로 상태 업데이트
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

  useEffect(() => {
    if (startDate && endDate) {
      const parsedStartDate = format(new Date(startDate), "yyyy-MM-dd");
      const parsedEndDate = format(new Date(endDate), "yyyy-MM-dd");
      setTripDates(`${parsedStartDate} ~ ${parsedEndDate}`);

      const start = new Date(startDate);
      const end = new Date(endDate);
      const numDays = differenceInDays(end, start) + 1;
      const labels = Array.from({ length: numDays }, (_, i) =>
        format(addDays(start, i), "yyyy-MM-dd")
      );
      setDayLabels(labels);
    } else {
      console.error("오류 발생");
    }
  }, [startDate, endDate, roomName]);

  const addNewItem = (dayIndex: number, title: string, location: string) => {
    const newId =
      scheduleData.flat().reduce((maxId, item) => Math.max(maxId, item.id), 0) +
      1;

    const newItem: ScheduleItem = {
      id: newId,
      title,
      time: "",
      location,
    };

    setScheduleData((prev) => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), newItem], // 해당 날짜 배열에 추가
    }));
  };

  const addLocation = (dayIndex: number, title: string, location: string) => {
    setScheduleData((prev) => {
      const updatedSchedule = [...prev];
      if (!updatedSchedule[dayIndex]) {
        updatedSchedule[dayIndex] = [];
      }
      updatedSchedule[dayIndex].push({
        id: Date.now(),
        title,
        time: "",
        location,
      });
      return updatedSchedule;
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-200px h-screen border border-lightgray p-4 relative">
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
              modalType === "peoples"
                ? "멤버 수정"
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
          {/* 여행 정보 */}
          <div className="mb-4 mt-8 text-center">
            <p>{participants.join(", ")}의</p>
            <h2 className="text-2xl font-bold">{tripTitle}</h2>
            <p className="text-gray text-sm mt-2">{tripDates}</p>
          </div>

          <div className="divide-y divide-gray mt-4">
            {dayLabels.map((dayLabel, index) => (
              <div key={index} className="py-8">
                <p className="text-sm text-gray px-2 pb-1">{dayLabel}</p>
                <div className="flex items-center gap-4 bg-lightblue py-1 px-3 rounded-lg">
                  <h3 className="text-[24px] font-semibold ">
                    {index + 1} day
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {/* 각 날짜에 해당하는 세부 일정 표시 */}
                  {/* <div></div> */}
                  {(scheduleData[index] || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 mt-4 border border-blue rounded-2xl px-6 py-4"
                    >
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
                    <div className="flex mt-6 gap-2 text-center">
                      <button
                        onClick={() => toggleSearch(index)}
                        className="w-1/2 py-1 rounded-lg text-sm border border-gray hover:bg-black hover:text-white"
                      >
                        장소 추가
                      </button>

                      <DirectInputButton
                        onConfirm={(title, location) =>
                          addNewItem(index, title, location)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={lastItemRef} className="h-1" />
          </div>
        </div>
        {/* 🔥 검색 세션 열기 버튼 */}
        {!isSearchOpen && (
          <button
            onClick={() => toggleSearch(0)}
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10 rounded-2xl border border-lightgray flex justify-center items-center"
            style={{ width: "40px", height: "40px", fontSize: "20px" }}
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* 🔥 검색 세션 (오른쪽) */}
      <div
        className={`p-4 relative transition-all duration-300 ease-in-out ${
          isSearchOpen ? "w-full" : "w-0 overflow-hidden"
        }`}
      >
        {isSearchOpen && selectedDayIndex !== null && (
          <>
            <Search dayIndex={selectedDayIndex} addLocation={addNewItem} />
            <button
              onClick={() => toggleSearch(selectedDayIndex)}
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-lightgray p-3 z-10 rounded-2xl border border-lightgray flex justify-center items-center"
              style={{ width: "40px", height: "40px", fontSize: "21px" }}
            >
              <FaChevronLeft />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Schedule;
