import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import api from "@/apis/axios";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function UserModeSwitcher() {
    const navigate = useNavigate();

    const resetUser = useUserStore(state => state.resetUser);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/logout", {}, { withCredentials: true });
        } catch (err) {
            // showToast("로그아웃에 실패했습니다."),
            navigate("/");
        } finally {
            resetUser();
            navigate("/");
        }
    };

    const mode = useUserStore(s => s.mode);
    const modeLabel = mode === "STAFF" ? "게스트하우스" : "스텝";
    const setMode = useUserStore(s => s.setMode);
    const handleToggleMode = () => {
        if (mode === "GUESTHOUSE") {
            setMode("STAFF");
            navigate("/staff", { replace: true });
        } else {
            setMode("GUESTHOUSE");
            navigate("/owner", { replace: true });
        }
    };
    return (
        <Wrapper.FlexBox direction="column" gap="16px">
            <Style.ModeChangeButton onClick={handleToggleMode} aria-disabled="true">
                <Text.Body1_1 color="Main">{modeLabel} 모드로 전환</Text.Body1_1>
            </Style.ModeChangeButton>
            <Wrapper.FlexBox justifyContent="center" gap="8px">
                <Text.Body2 color="Gray2" onClick={() => setLogoutModalOpen(true)} style={{ cursor: "pointer" }}>
                    로그아웃
                </Text.Body2>
                <Text.Body2 color="Gray2"> | </Text.Body2>
                <Text.Body2 color="Gray2">회원 탈퇴</Text.Body2>
            </Wrapper.FlexBox>

            {isLogoutModalOpen && (
                <Modal
                    variant="confirm"
                    title="로그아웃 하시겠습니까?"
                    message="확인 버튼 클릭 시 로그아웃됩니다."
                    cancelText="취소"
                    confirmText="확인"
                    handleModalClose={() => setLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                />
            )}
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
