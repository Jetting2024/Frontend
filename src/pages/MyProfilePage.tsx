import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoPerson } from "react-icons/go";

const MyProfilePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="w-full h-screen relative">
        <Navbar />
        <div className=" absolute inset-0 flex justify-center items-center">
            <div className="w-[500px] h-[517px] p-4 gap-16 flex flex-col justify-center items-center">
                {/* 프로필 사진 업로드하기 */}
                <div className="relative">
                    <label htmlFor="profileImage" className="cursor-pointer">
                    {selectedImage ? (
                        <img
                        src={selectedImage}
                        alt="프로필 미리보기"
                        className=" w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-[#3d3d3d] rounded-full shadow-sm flex justify-center items-center">
                        <GoPerson size={42} fill="#fff" />
                        </div>
                    )}
                    </label>
                </div>
                <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                
                <div className="w-full flex flex-col gap-4">
                    <div className=" w-full text-[1.6rem] font-bold">프로필 설정하기</div>
                    
                    <div className=" flex flex-col">
                        <div className=" text-[0.8rem] px-2">닉네임</div>
                        <input
                            className="h-10 border border-[#3d3d3d] border-opacity-30 shadow-sm rounded-lg mt-[2px] outline-none px-2"
                            placeholder="닉네임을 입력해주세요."
                        />
                    </div>

                    <div className=" flex flex-col">
                        <div className=" text-[0.8rem] px-2">이메일</div>
                        <input
                            className="h-10 border border-[#3d3d3d] border-opacity-30 shadow-sm rounded-lg mt-[2px] outline-none px-2"
                            placeholder="이메일을 입력해주세요."
                        />
                    </div>
                    
                </div>

                    <div className="w-full flex justify-center items-center">
                        <button className="w-60 h-12 rounded-full shadow-sm bg-black text-white hover:bg-opacity-80">저장</button>
                    </div>


            
            </div>
        </div>
    </div>
  );
};

export default MyProfilePage;
