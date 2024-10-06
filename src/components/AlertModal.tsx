import React from "react";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string; // 기본값 : 확인
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
  onClose: () => void; // 모달 닫기 함수
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "확인",
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="px-10 bg-white border-blue border-2 p-6 rounded-3xl shadow-lg ">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 rounded-2xl bg-black text-white hover:bg-gray"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-2xl bg-black text-white hover:bg-gray"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
