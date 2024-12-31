import axios from "axios";
import React from "react";
import { FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatRoomState } from "../../global/recoil/atoms";
import { authState } from "../../global/recoil/authAtoms";

const InviteModal: React.FC = () => {
  const navigate = useNavigate();

  const setChatRoomInfo = useSetRecoilState(chatRoomState);

  const userId = localStorage.getItem("id");
  const member = "유지원, 조윤주";
  const name = "두근두근 나트랑 여행";

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

        console.log("member: ", member);
        console.log("roomName: ", roomName);
      
        setChatRoomInfo({roomId, userId, member, roomName});
      }
      navigate('/schedule');
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[780px] h-[517px] bg-white rounded-lg border border-[#3d3d3d] border-opacity-10 shadow-md flex flex-col justify-center items-center">
      <div className=" text-[1.5rem] font-bold mb-2">누구랑 가시나요?</div>
      <div className=" text-[1.5rem] font-bold mb-10">
        함께 여행 갈 가족이나 친구를 초대하세요.
      </div>
      <div className="w-[520px] h-48 flex flex-col justify-between">
        <div className=" flex flex-row justify-between">
          <button className=" w-60 h-12 rounded-full shadow-sm bg-[#FFDD36] text-[#4E2828] flex flex-row justify-center items-center hover:bg-opacity-80">
            <img src="Kakao_symbol.svg" alt="kakao" className=" w-4 h-4 mr-2" />
            카카오로 친구 초대
          </button>
          <button className=" w-60 h-12 rounded-full shadow-sm bg-black text-white hover:bg-opacity-80">
            {" "}
            친구 목록에서 초대
          </button>
        </div>

        <button
          className=" w-full h-12 rounded-full shadow-sm border border-[#b7b7b7] bg-white text-[#959595] flex flex-row justify-center items-center hover:bg-lightgray"
          onClick={goSchedule}
        >
          <FaLink fill="#b7b7b7" className="mr-2" />
          초대 링크 복사
        </button>
        <button className=" w-full h-12 rounded-full shadow-sm bg-[#509FE8] bg-opacity-35 hover:bg-opacity-25">
          혼자 여행갈래요
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
