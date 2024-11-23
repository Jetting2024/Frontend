const CLIENT_ID = '5caab219546708f8dfdeb76b1cced42d';
const REDIRECT_URL = 'http://localhost:3000/member/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`