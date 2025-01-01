import axios from "axios";
import React from "react";
import { FaLink } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";
import { IoCloseCircleOutline } from "react-icons/io5";

const InviteModal: React.FC = () => {
  const navigate = useNavigate();

  const setChatRoomInfo = useSetRecoilState(chatRoomState);
  const location = useLocation();

  const userId = sessionStorage.getItem("id");
  const member = "유지원, 조윤주";
  const date = location.state?.fullDate;
  const name = location.state?.roomName;

  const readAuthState = useRecoilValue(authState);

  const goSchedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat/createRoom",
        {
          userId: userId,
          member: member,
          roomName: name,
        }, {
            headers: {
                Authorization: `Bearer ${readAuthState.accessToken}`,
                "Content-Type" : "application/json"
            },
        }
      );

      const roomId = response.data.result;
      console.log("created chat room ID: ", roomId);

      if (response.data.success) {
        const roomInfo = await axios.get(`http://localhost:8080/chat/info/${roomId}`, {
          headers: {
            Authorization: `Bearer ${readAuthState.accessToken}`
          }
        });

        const userId = readAuthState.id;
        const member = roomInfo.data.result.member;
        const roomName = roomInfo.data.result.roomName;
      
        setChatRoomInfo({roomId, userId, member, roomName, date});
      }
      navigate('/schedule');
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-auto h-auto p-2 bg-white rounded-lg border border-[#3d3d3d] border-opacity-10 shadow-md flex flex-col justify-center items-center">
      <div className=" w-full h-auto mx-2 flex justify-end">
        <button>
          <IoCloseCircleOutline size={24} onClick={() => navigate(-1)} />
        </button>
      </div>
      <div className="w-auto h-auto py-10 px-8 flex flex-col items-center">
        <div className=" text-[1.3rem] font-bold mb-1">누구랑 가시나요?</div>
        <div className=" text-[1.3rem] font-bold mb-10">
          함께 여행 갈 가족이나 친구를 초대하세요!
        </div>

        <div className=" flex flex-row justify-center gap-6">
            <button className=" w-12 h-12 rounded-full shadow-sm bg-[#FFDD36] text-[#4E2828] flex flex-row justify-center items-center hover:bg-opacity-80">
              <img src="Kakao_symbol.svg" alt="kakao" className=" w-6 h-6" />
            </button>
              <button
                className=" w-12 h-12 rounded-full shadow-sm border border-[#b7b7b7] bg-white text-[#959595] flex flex-row justify-center items-center hover:bg-lightgray"
                onClick={goSchedule}
              >
                <FaLink fill="#b7b7b7" className="w-6 h-6" />
              </button>
          </div>
      </div>
    </div>
  );
};

export default InviteModal;
