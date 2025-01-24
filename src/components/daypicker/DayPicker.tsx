import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom.css"; // 커스텀 CSS 파일
import { ko } from "date-fns/locale"; // 한국어 설정
import { getMonth, getYear } from "date-fns";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"; // react-icons에서 아이콘 사용
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../global/recoil/authAtoms";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const DayPicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined); // 시작 날짜
  const [endDate, setEndDate] = useState<Date | undefined>(undefined); // 끝 날짜
  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date())); // 현재 연도
  const navigator = useNavigate();
  const location = useLocation();
  const { travelName } = location.state || { travelName: "" }; // 이전 페이지에서 전달받은 travelName

  const readAuthState = useRecoilValue(authState);

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start || undefined);
      setEndDate(end || undefined);
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  // 커스텀 입력 컴포넌트
  const CustomInput = React.forwardRef<HTMLButtonElement, any>(
    ({ value, onClick }, ref) => (
      <button className="input-box" onClick={onClick} ref={ref}>
        {value || "날짜 선택"}
      </button>
    )
  );

  // 연도 변경 핸들러
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const selectDate = async () => {
    if (!startDate || !endDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    // 년도와 날짜 포맷
    const year = selectedYear ? `${selectedYear}년` : "";
    const start = startDate
      ? `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`
      : "";
    const end = endDate
      ? `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`
      : "";

    // 숙박 일수 계산
    const nights =
      endDate && startDate
        ? Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;

    const fullDate = `${year} ${start} ~ ${end} (${nights}박 ${nights + 1}일)`;
    navigator("/make-room", { state: { fullDate } });

    // 날짜 포맷팅 (xxxx-xx-xx 형식)
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 2자리
      const day = String(date.getDate()).padStart(2, "0"); // 일 2자리
      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = startDate ? formatDate(startDate) : null;
    const formattedEndDate = endDate ? formatDate(endDate) : null;

    try {
      const response = await fetch("http://localhost:8080/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${readAuthState.accessToken}`,
        },
        body: JSON.stringify({
          travelName,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("travelId:", data.result);
      } else {
        console.error("여행 생성 실패:", response);
        alert("여행 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="datepicker-frame w-[517px] h-[620px]">
      <div className="font-bold text-[1.2rem] mb-2">언제 가시나요?</div>
      <div className="font-bold text-[1.2rem] mb-4">날짜를 선택해주세요.</div>
      <div>
        <DatePicker
          withPortal
          dateFormat="MM.dd"
          inline
          selectsRange // 범위 선택 활성화
          startDate={startDate} // 시작 날짜
          endDate={endDate} // 끝 날짜
          onChange={handleDateChange} // 날짜 변경 핸들러
          wrapperClassName="input-attribute"
          customInput={<CustomInput />} // 커스텀 입력 사용
          excludeDateIntervals={[
            {
              start: new Date(),
              end: new Date(new Date().setDate(new Date().getDate() + 2)),
            },
          ]} // 특정 날짜 범위 제외
          locale={ko} // 한국어 로케일
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
            const currentMonth = getMonth(monthDate); // 현재 월 (0부터 시작, 0은 1월)
            return (
              <div className="custom-header">
                {/* 연도 선택 드롭다운 추가 */}
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="year-select"
                >
                  {[...Array(10)].map((_, index) => {
                    const year = getYear(new Date()) + index; // 현재 연도 기준으로 10년까지 선택 가능
                    return (
                      <option key={year} value={year}>
                        {year}년
                      </option>
                    );
                  })}
                </select>
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className="month-button"
                >
                  <FaChevronLeft />
                </button>
                <span className="month">{MONTHS[currentMonth]}</span>
                <button
                  type="button"
                  onClick={increaseMonth}
                  className="month-button"
                >
                  <FaChevronRight />
                </button>
              </div>
            );
          }}
        />

        <div className="button-container">
          <button className="button1" onClick={selectDate}>
            선택
          </button>
          <Link className="button2" to="/">
            지역 다시 선택하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DayPicker;
