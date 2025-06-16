import { Button } from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import { TypeButton } from "@/components/TypeButton";
import { patchUserType } from "@/hooks/auth/patchUserType";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TypeSelectPage() {
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await patchUserType(selected as "STAFF" | "GUESTHOUSE");
            const userInfo = await fetchMinimumUserInfo();
            useUserStore.getState().setUser({
                nickname: userInfo.nickname,
                type: userInfo.userType,
                profileImage: userInfo.profileImage,
            });

            if (userInfo.userType === "STAFF") {
                navigate("/staff");
            } else if (userInfo.userType === "GUESTHOUSE") {
                navigate("/owner");
            } else {
                console.warn("알 수 없는 사용자 유형입니다.");
                navigate("/");
            }
        } catch (error) {
            console.error("타입 선택 후 이동 실패", error);
        }
    };

    return (
        <>
            <PageWrapper>
                <TextGroup>
                    <Text.Title2>반갑습니다!</Text.Title2>
                    <Text.Title1_1>
                        게스트하우스 또는 스텝 중 <br />
                        하나를 선택해주세요.
                    </Text.Title1_1>
                </TextGroup>
                <ButtonGroup>
                    <TypeButton
                        emoji="🏠"
                        label="게스트하우스"
                        subLabel="(guesthouse)"
                        isActive={selected === "GUESTHOUSE"}
                        onClick={() => setSelected("GUESTHOUSE")}
                    />

                    <TypeButton
                        emoji="👤"
                        label="스텝"
                        subLabel="(staff)"
                        isActive={selected === "STAFF"}
                        onClick={() => setSelected("STAFF")}
                    />
                </ButtonGroup>
                <ButtonWrapper>
                    <Button
                        label="가입 완료 버튼"
                        width="large"
                        onClick={handleSubmit}
                        disabled={!selected}
                        isActive={!!selected}
                    >
                        선택 완료
                    </Button>
                </ButtonWrapper>
            </PageWrapper>
        </>
    );
}

const ButtonGroup = styled.div`
    display: flex;
    gap: 8.5px;
    justify-content: center;
    margin-top: 32px;
`;

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 43vh;
`;
