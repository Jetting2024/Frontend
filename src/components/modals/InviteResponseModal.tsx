import React, { useState } from "react";
import { IoCloseOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { authState } from "../../global/recoil/authAtoms";
import { respondToInvite } from "../../invitation/InvitationService";

const InviteResponseModal: React.FC = () => {
  const invitedPerson = "유지원";
  const [isVisible, setIsVisible] = useState(true);
  const [travelId, setTravelId] = useState<number>(5);
  const [invitationLink, setInvitationLink] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const readAuthState = useRecoilValue(authState);

  const RespondToInvitation = async (accept: boolean) => {
    if (!readAuthState.accessToken) {
      return;
    }
    try {
      const message = await respondToInvite(
        travelId,
        invitationLink,
        accept,
        readAuthState.accessToken
      );
      setResponseMessage(message);
      console.log("message: ", message);
    } catch (error) {
      console.log("failed to generate invitation: ", error);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-[26rem] h-20 flex items-center justify-center bg-zinc-800 rounded-xl p-4 gap-4">
      {/* 아이콘 */}
      <IoPersonCircleOutline size={28} fill="#fff" />

      {/* 텍스트 영역 */}
      <div className=" w-auto flex flex-col flex-1 max-w-[12rem]">
        <span className="text-white text-[0.8rem] whitespace-nowrap overflow-hidden text-ellipsis block">
          "{invitedPerson}"
        </span>
        <span className="text-white text-[0.8rem]">님을 초대하시겠습니까?</span>
      </div>

      {/* 버튼 및 닫기 아이콘 */}
      <div className="flex flex-row gap-2 items-center">
        <button
          className="text-red-300 text-[0.8rem] hover:text-red-400"
          onClick={() => RespondToInvitation(false)}
        >
          거부
        </button>
        <button
          className="px-4 py-1 text-white text-[0.8rem] rounded-lg border border-gray hover:bg-gray"
          onClick={() => RespondToInvitation(true)}
        >
          수락
        </button>
        <IoCloseOutline
          size={24}
          stroke="#fff"
          className=" cursor-pointer"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default InviteResponseModal;
