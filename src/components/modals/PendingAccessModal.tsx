import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PendingAccessModal: React.FC = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const invitationId = "example-invitation-id"; // 초대 ID는 실제 URL이나 상태에서 가져와야 함

  const closeModal = () => {
    setIsVisible(false);
    navigate("/"); // 홈으로 이동
  };

  const checkHostResponse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/invitation/status/${invitationId}`
      );

      if (response.data.status === "approved") {
        setResponseMessage("호스트가 요청을 허용했습니다.");
        setTimeout(() => navigate("/chat-room"), 2000); // 2초 후 채팅방으로 이동
      } else if (response.data.status === "rejected") {
        setResponseMessage("호스트가 요청을 거부했습니다.");
      }
    } catch (error) {
      console.error("Error fetching host response:", error);
      setResponseMessage("호스트의 응답을 확인할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkHostResponse();
    }, 3000); // 3초마다 상태 확인

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-[26rem] h-40 flex flex-col items-center justify-center bg-zinc-800 rounded-xl p-6 gap-4 shadow-lg">
      {loading ? (
        <div className="flex flex-col items-center">
          <p className="text-white text-[1rem] mb-4">호스트가 요청을 처리 중입니다...</p>
          <img src="/loading.svg" alt="로딩 중" className="w-12 h-12" />
        </div>
      ) : (
        <div className=" flex flex-col gap-4">
          <p className="text-white text-[1rem]">{responseMessage}</p>
          <button className=" text-black text-[1rem] bg-white rounded-full py-1 hover:bg-gray" onClick={closeModal}>화면 나가기</button>
        </div>
      )}
    </div>
  );
};

export default PendingAccessModal;
