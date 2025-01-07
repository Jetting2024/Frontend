import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  generateInvitation,
  respondToInvite,
} from "../../invitation/InvitationService";

const InviteModal: React.FC = () => {
  const navigate = useNavigate();

  const setChatRoomInfo = useSetRecoilState(chatRoomState);
  const location = useLocation();

  const userId = sessionStorage.getItem("id");
  const member = "유지원, 조윤주";
  const date = location.state?.fullDate;
  const name = location.state?.roomName;

  const readAuthState = useRecoilValue(authState);

  const [travelId, setTravelId] = useState<number>(5);
  const [invitationLink, setInvitationLink] = useState<string>("");

  const handleGenerateInvitation = async () => {
    try {
      const link = await generateInvitation(travelId);
      setInvitationLink(link);
    } catch (error) {
      console.log("Failed to generate invitation: ", error);
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

  const goSchedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat/createRoom",
        {
          userId: userId,
          member: member,
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
      console.log("created chat room ID: ", roomId);
      console.log('response : ', response);

      if (response.data.success) {
        try {
          const roomInfo = await axios.get(
            `http://localhost:8080/chat/info/5`, // 수정 부분
            {
              headers: {
                Authorization: `Bearer ${readAuthState.accessToken}`,
              },
            }
          );
          console.log('roomInfo: ', roomInfo);
  
          const userId = readAuthState.id;
          const member = roomInfo.data.result.member;
          const roomName = roomInfo.data.result.roomName;
  
          setChatRoomInfo({ roomId, userId, member, roomName, date });
        } catch (error) {
          console.log('error: ', error)
        }
      }
      navigate("/schedule");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGenerateInvitation();
  }, []);

  return (
    <div className="p-2 bg-white rounded-lg border border-[#3d3d3d] border-opacity-10 shadow-md flex flex-col items-center">
      <div className="w-full flex justify-end">
        <button>
          <IoCloseCircleOutline size={24} onClick={() => navigate(-1)} />
        </button>
      </div>
      <div className="py-10 px-8 flex flex-col items-center">
        <h1 className="text-[1.3rem] font-bold mb-1">누구랑 가시나요?</h1>
        <p className="text-[1.3rem] font-bold mb-10">
          함께 여행 갈 가족이나 친구를 초대하세요!
        </p>

        {/* 링크 부분 */}
        <div className="flex gap-6">
          <div
            className="h-12 flex items-center px-4 gap-2 rounded-full shadow-sm text-[0.8rem] text-gray border border-[#b7b7b7] bg-white hover:bg-lightgray"
            onClick={goSchedule}
          >
            <FaLink fill="#b7b7b7" className="w-4 h-4" />
            <span className="text-black text-opacity-50">{invitationLink}</span>
            <button onClick={handleCopyLink}>복사</button>
          </div>
        </div>
          <button 
          className=" w-28 h-12 mt-6 bg-black text-white rounded-lg hover:bg-gray"
          onClick={goSchedule}
          >
            초대 완료
          </button>
      </div>
    </div>
  );
};

export default InviteModal;
