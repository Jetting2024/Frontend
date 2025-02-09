import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullDate = location.state?.fullDate;
  const roomName = location.state?.roomName;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/invite", { state: { fullDate, roomName } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, fullDate, roomName]);
  return (
    <div className=" w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <div className=" flex flex-col items-center">
        <img src="/loading.svg" alt="로딩 중" className="w-72 h-72" />
        <p className="text-[1.5rem] font-bold">
          초대 링크를 생성하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
