import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";

export default function LoginPage() {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

    const handleKakaoLogin = async () => {
        if ("Notification" in window && Notification.permission === "default") {
            try {
                const result = await Notification.requestPermission();
                console.log("알림 권한 결과:", result);

                if (result === "granted") {
                    new Notification("올래스텝", {
                        body: "알림 권한이 성공적으로 설정되었습니다!",
                    });
                }
            } catch (e) {
                console.warn("알림 권한 요청 실패:", e);
            }
        }

        setTimeout(() => {
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
            window.location.href = url;
        }, 500);
    };

    const handleNaverLogin = () => {
        const state = crypto.randomUUID();
        sessionStorage.setItem("naver_auth_state", state);

        const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`;
        window.location.href = url;
    };

    const handleGoogleLogin = () => {
        window.location.href = "/auth/google";
    };

    return (
        <Background>
            <TopSection>
                <Text.Title3_1 color="White" style={{ textAlign: "center" }}>
                    제주도 숙박공간과 스텝의 연결고리
                </Text.Title3_1>
                <LogoArea>
                    <img src="/images/logo.svg" alt="올래스텝 로고" />
                    <img src="/images/logo_text.png" alt="올래스텝" />
                </LogoArea>
            </TopSection>

            <ButtonContainer>
                <LoginButton bgColor="Kakao" onClick={handleKakaoLogin}>
                    <LoginButtonIcon src="/icons/kakao.svg" alt="카카오 아이콘" />
                    <Text.Title3_1 style={{ marginTop: "3px" }}>카카오 로그인</Text.Title3_1>
                </LoginButton>

                <LoginButton bgColor="Naver" onClick={handleNaverLogin}>
                    <LoginButtonIcon src="/icons/naver.svg" alt="네이버 아이콘" />
                    <Text.Title3_1 color="White" style={{ marginTop: "3px" }}>
                        네이버 로그인
                    </Text.Title3_1>
                </LoginButton>

                <LoginButton bgColor="White" onClick={handleGoogleLogin}>
                    <LoginButtonIcon src="/icons/google.svg" alt="구글 아이콘" />
                    <Text.Title3_1 style={{ marginTop: "3px" }}>구글 로그인</Text.Title3_1>{" "}
                </LoginButton>
            </ButtonContainer>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: url("/images/login.png") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 80px 16px 40px;
    box-sizing: border-box;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
`;

const LogoArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    max-width: 333px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const LoginButton = styled.button<{
    bgColor: keyof typeof theme.color;
}>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 54px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: pointer;
`;

const LoginButtonIcon = styled.img`
    position: absolute;
    left: 16px;
    width: 20px;
    height: 20px;
`;
