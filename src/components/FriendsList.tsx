import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi"; // 삭제 버튼 아이콘

interface Friend {
  id: number;
  name: string;
  profile: string;
}

interface FriendListProps {
  isOpen: boolean;
  toggleFriendsList: () => void;
}

const friends: Friend[] = [
  { id: 1, name: "김하은", profile: "https://via.placeholder.com/50" },
  { id: 2, name: "유지원", profile: "https://via.placeholder.com/50" },
  { id: 3, name: "최강록", profile: "https://via.placeholder.com/50" },
];

const FriendItem: React.FC<{
  friend: Friend;
  onSelect: (friend: Friend) => void;
  isSelected: boolean;
  isChatReady: boolean;
}> = ({ friend, onSelect, isSelected, isChatReady }) => {
  return (
    <div
      className={`flex items-center py-2 px-2 m-4 rounded-lg cursor-pointer ${
        isSelected ? "bg-white" : "hover:bg-[#CEDDF7]"
      }  ${!isChatReady && "cursor-not-allowed"}`}
      onClick={() => isChatReady && onSelect(friend)} // isChatReady 상태에서만 클릭 가능
    >
      <img
        src={friend.profile}
        alt={friend.name}
        className="w-10 h-10 rounded-full"
      />
      <span className="ml-4 text-base">{friend.name}</span>
    </div>
  );
};

// 선택된 친구들
const SelectedFriends: React.FC<{
  selectedFriends: Friend[];
  onRemove: (friend: Friend) => void;
}> = ({ selectedFriends, onRemove }) => {
  return (
    <div className="mt-4 p-4 border-t border-gray">
      <h3 className="text-sm">선택된 친구</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {selectedFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center border border-gray rounded-3xl px-5 py-2"
          >
            <span className="ml-2 text-base">{friend.name}</span>
            <button onClick={() => onRemove(friend)} className="ml-2 text-gray">
              <FiXCircle size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FriendList: React.FC<FriendListProps> = ({
  isOpen,
  toggleFriendsList,
}) => {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [isChatReady, setIsChatReady] = useState(false);

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriends((prev) => {
      if (prev.some((f) => f.id === friend.id)) {
        return prev.filter((f) => f.id !== friend.id); // 이미 선택된 친구는 선택 해제
      } else {
        return [...prev, friend]; // 친구 선택
      }
    });
  };

  const handleRemoveFriend = (friend: Friend) => {
    setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
  };

  const handleCreateChat = () => {
    setIsChatReady(true);
  };

  return (
    <div>
      <div className="flex p-4 border-b border-gray">
        <FaUserFriends className="text-xl mr-2" />
        <h2 className="text-base font-semibold">친구 목록</h2>
        {/* <button
          className="ml-auto text-gray text-sm"
          onClick={toggleFriendsList}
        >
          닫기
        </button> */}
      </div>

      {/* 친구목록 */}
      <div className="mt-4">
        <div className="overflow-y-auto max-h-1/2">
          {friends.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              onSelect={handleFriendSelect}
              isSelected={selectedFriends.some((f) => f.id === friend.id)}
              isChatReady={isChatReady}
            />
          ))}
        </div>

        {/* 선택된 친구 */}
        {selectedFriends.length > 0 && (
          <SelectedFriends
            selectedFriends={selectedFriends}
            onRemove={handleRemoveFriend}
          />
        )}

        <div className="flex flex-col items-center justify-center">
          <button
            className="mt-4 w-48 text-base py-2 bg-black text-white rounded-3xl hover:bg-gray"
            onClick={handleCreateChat}
          >
            채팅방 만들기
          </button>
          <button className="mt-4 w-48 py-2 text-base bg-yellow-300 rounded-3xl hover:bg-yellow-200">
            카카오톡 친구 초대
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
