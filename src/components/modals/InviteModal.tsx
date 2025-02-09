import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  generateInvitation,
} from "../../invitation/InvitationService";
import LoadingPage from "../../pages/LoadingPage";

const InviteModal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.roomName;
  const readAuthState = useRecoilValue(authState);
  const [roomState, setRoomState] = useRecoilState(chatRoomState);

  const [invitationLink, setInvitationLink] = useState<string>("");
  const [isLinkGenerated, setIsLinkGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  const handleGenerateInvitation = async () => {
    try {
      const link = await generateInvitation(roomState.travelId?.toString() ?? "");
      setInvitationLink(link);
      setIsLinkGenerated(true);
    } catch (error) {
      console.log("Failed to generate invitation: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (invitationLink) {
      navigator.clipboard
        .writeText(invitationLink)
        .then(() => {
          alert("링크가 복사되었습니다.");
        })
        .catch((err) => {
          console.log("링크 복사 실패");
        });
    } else {
      alert("초대 링크가 생성되지 않았습니다.");
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat/createRoom",
        {
          travelId: roomState.travelId,
          roomName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${readAuthState.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const roomId = response.data.result;
      setRoomState({
        ...roomState,
        roomId: roomId.toString(),
      });
      navigate('/schedule');
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    handleGenerateInvitation();
  }, []);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div className="p-2 bg-white rounded-lg border border-[#3d3d3d] border-opacity-10 shadow-md flex flex-col items-center">
      <div className="py-10 px-8 flex flex-col items-center">
        <h1 className="text-[1.3rem] font-bold mb-1">누구랑 가시나요?</h1>
        <p className="text-[1.3rem] font-bold mb-10">
          함께 여행 갈 가족이나 친구를 초대하세요!
        </p>

        {/* 링크 부분 */}
        <div className="flex gap-6">
          <div
            className="h-12 flex items-center px-4 gap-2 rounded-full shadow-sm text-[0.8rem] text-gray border border-[#b7b7b7] bg-white hover:bg-lightgray">
            <FaLink fill="#b7b7b7" className="w-4 h-4" />
            <span className="text-black text-opacity-50">{invitationLink}</span>
            <button onClick={handleCopyLink}>복사</button>
          </div>
        </div>
          <button 
          className=" w-28 h-12 mt-6 bg-black text-white rounded-lg hover:bg-gray"
          onClick={createRoom}
          >
            초대 완료
          </button>
      </div>
    </div>
  );
};

export default InviteModal;
