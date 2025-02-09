import React, { useState } from "react";

interface DirectInputButtonProps {
  onConfirm: (title: string, location: string) => void;
}

const DirectInputButton: React.FC<DirectInputButtonProps> = ({ onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>(""); // 장소 이름
  const [location, setLocation] = useState<string>(""); // 장소 위치

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (!title.trim() || !location.trim()) {
      alert("장소 이름과 위치를 입력해주세요.");
      return;
    }
    onConfirm(title, location); // 부모 컴포넌트로 데이터 전달
    setTitle(""); // 입력값 초기화
    setLocation("");
    closeModal(); // 모달 닫기
  };

  return (
    <>
      {/* 직접 입력 버튼 */}
      <button
        onClick={openModal}
        className="w-1/2 py-1 rounded-lg text-sm border border-gray hover:bg-black hover:text-white"
      >
        직접 입력
      </button>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">직접 장소를 추가하세요</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="장소 이름"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="장소 위치"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-lightgray text-black rounded-2xl hover:bg-black hover:text-white"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-lightgray text-black rounded-2xl hover:bg-black hover:text-white"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DirectInputButton;
