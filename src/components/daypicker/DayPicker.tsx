import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom.css"; // 커스텀 CSS 파일
import { ko } from "date-fns/locale"; // 한국어 설정
import { getMonth, getYear } from "date-fns";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"; // react-icons에서 아이콘 사용
import { Link } from "react-router-dom";

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

  const selectDate = () => {
    // 선택된 날짜 처리 로직
    alert(`선택된 날짜: ${startDate ? startDate.toLocaleDateString() : ""} ~ ${endDate ? endDate.toLocaleDateString() : ""}`);
  };

  return (
    <div className="datepicker-frame w-[517px] h-[620px]">
      <div className="font-bold text-[1.2rem] mb-2">언제 가시나요?</div>
      <div className="font-bold text-[1.2rem] mb-4">날짜를 선택해주세요.</div>
      <div>
        <DatePicker
          withPortal
          dateFormat="yyyy.MM.dd(eee)"
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
          <Link className="button1" onClick={selectDate} to='/make-room'>
            선택
          </Link>
          <Link className="button2" to='/'>
            지역 다시 선택하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DayPicker;
