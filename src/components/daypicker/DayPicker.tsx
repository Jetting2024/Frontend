import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom.css";
import { ko } from "date-fns/locale";
import { getMonth, getYear } from "date-fns";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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

// ** DayPicker Props 타입 정의
interface DayPickerProps {
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DayPicker: React.FC<DayPickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = React.useState<number>(getYear(new Date()));
  const navigator = useNavigate();

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

  const CustomInput = React.forwardRef<HTMLButtonElement, any>(
    ({ value, onClick }, ref) => (
      <button className="input-box" onClick={onClick} ref={ref}>
        {value || "날짜 선택"}
      </button>
    )
  );

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const selectDate = () => {
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
  };

  return (
    <div className="datepicker-frame w-[517px] h-[580px]">
      <div className=" w-full flex justify-end -mt-8 mr-2">
        <button>
          <IoCloseCircleOutline size={24} onClick={() => navigate(-1)} />
        </button>
      </div>
      <div className="font-bold text-[1.2rem] mb-2">언제 가시나요?</div>
      <div className="font-bold text-[1.2rem] mb-4">날짜를 선택해주세요.</div>
      <div>
        <DatePicker
          withPortal
          dateFormat="MM.dd"
          inline
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          wrapperClassName="input-attribute"
          customInput={<CustomInput />}
          excludeDateIntervals={[
            {
              start: new Date(),
              end: new Date(new Date().setDate(new Date().getDate() + 2)),
            },
          ]}
          locale={ko}
          renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
            const currentMonth = getMonth(monthDate);
            return (
              <div className="custom-header">
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="year-select"
                >
                  {[...Array(10)].map((_, index) => {
                    const year = getYear(new Date()) + index;
                    return (
                      <option key={year} value={year}>
                        {year}년
                      </option>
                    );
                  })}
                </select>
                <button type="button" onClick={decreaseMonth} className="month-button">
                  <FaChevronLeft />
                </button>
                <span className="month">{MONTHS[currentMonth]}</span>
                <button type="button" onClick={increaseMonth} className="month-button">
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
        </div>
      </div>
    </div>
  );
};

export default DayPicker;
