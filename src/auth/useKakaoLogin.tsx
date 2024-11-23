import { useSetRecoilState } from "recoil"
import { authState } from "../global/authAtoms"
import axios from "axios";

export const useKakaoLogin = () => {
    const setAuth = useSetRecoilState(authState);

    const kakaoLogin = async (code: string): Promise<boolean> => {

        try {
            const response = await axios.get(
                `http://localhost:8080/member/kakao/callback?code=${code}`
            );

            console.log('response: ', response);

            const { accessToken, refreshToken } = response.data.data;

            // 로컬 스토리지에 토큰 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
    
            // Recoil 상태 설정 (로그인 상태로 설정)
            setAuth({ isAuthenticated: true, accessToken, refreshToken });
            
            console.log("카카오 로그인 성공: ", accessToken, refreshToken);
            return true;
        } catch (error) {
            console.error("카카오 로그인 실패", error);
            return false;
        }
    };

    return { kakaoLogin };
}