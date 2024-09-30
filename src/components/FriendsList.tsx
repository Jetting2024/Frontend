import React from "react";

interface FriendListProps {
  isOpen: boolean;
  toggleFriendsList: () => void;
}

const friends = [
  { id: 1, name: "친구 1", profile: "https://via.placeholder.com/50" },
  { id: 2, name: "친구 2", profile: "https://via.placeholder.com/50" },
  { id: 3, name: "친구 3", profile: "https://via.placeholder.com/50" },
];

const FriendList: React.FC<FriendListProps> = ({
  isOpen,
  toggleFriendsList,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">친구 목록</h2>
        <button
          onClick={toggleFriendsList}
          className="text-gray-500 hover:text-gray-700"
        >
          닫기
        </button>
      </div>
      <div className="p-4">
        <div className="overflow-y-auto max-h-60">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center py-2 border-b border-gray-200"
            >
              <img
                src={friend.profile}
                alt={friend.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-4">{friend.name}</span>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          채팅방 만들기
        </button>
        <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          카카오톡 친구 초대
        </button>
      </div>
    </div>
  );
};

export default FriendList;
