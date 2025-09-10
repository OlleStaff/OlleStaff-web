import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import api from "@/apis/axios";

export default function UserModeSwitcher() {
    const navigate = useNavigate();

    const userType = useUserStore(state => state.type);
    const resetUser = useUserStore(state => state.resetUser);

    const handleLogout = async () => {
        try {
            await api.post("/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("로그아웃 요청 실패", err);
        } finally {
            resetUser();
            navigate("/");
        }
    };
    // const nickname = useUserStore(state => state.nickname);
    // const profileImage = useUserStore(state => state.profileImage);
    // const setUser = useUserStore(state => state.setUser);

    const modeLabel = userType === "STAFF" ? "게스트하우스" : "스텝";

    const handleToggleMode = () => {
        // const nextType = userType === "STAFF" ? "GUESTHOUSE" : "STAFF";
        // setUser({ nickname, type: nextType, profileImage });
        // if (nextType === "STAFF") {
        //     navigate("/staff");
        // } else {
        //     navigate("/owner");
        // }
    };

    return (
        <Wrapper.FlexBox direction="column" gap="16px">
            <Style.ModeChangeButton onClick={handleToggleMode} aria-disabled="true">
                <Text.Body1_1 color="Main">{modeLabel} 모드로 전환</Text.Body1_1>
            </Style.ModeChangeButton>
            <Wrapper.FlexBox justifyContent="center" gap="8px">
                <Text.Body2 color="Gray2" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    로그아웃
                </Text.Body2>
                <Text.Body2 color="Gray2"> | </Text.Body2>
                <Text.Body2 color="Gray2">회원 탈퇴</Text.Body2>
            </Wrapper.FlexBox>
        </Wrapper.FlexBox>
    );
}

const Style = {
    ModeChangeButton: styled.div`
        width: 100%;
        height: 42px;
        border: 1px solid ${theme.color.Main};
        border-radius: 8px;
        padding: 18px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `,
};
