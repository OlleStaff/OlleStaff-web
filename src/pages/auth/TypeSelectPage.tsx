import { Button } from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import { TypeButton } from "@/components/TypeButton";
import { patchUserType } from "@/hooks/auth/patchUserType";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

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
                gender: userInfo.gender,
                birthDate: userInfo.birthDate,
            });

            if (userInfo.userType === "STAFF") {
                navigate("/staff", { replace: true });
            } else if (userInfo.userType === "GUESTHOUSE") {
                navigate("/owner", { replace: true });
            } else {
                // showToast("알수없는 사용자 유형입니다. 다시 로그인해주세요."),
                navigate("/");
            }
        } catch (error) {
            // showToast("이동에 실패했습니다. 다시 로그인해주세요."),
            navigate("/");
        }
    };

    return (
        <>
            <PageWrapper>
                <Wrapper.FlexBox
                    direction="column"
                    justifyContent="space-between"
                    height={`calc(100vh - ${theme.size.HeaderHeight})`}
                >
                    <div>
                        <Wrapper.FlexBox direction="column" gap="12px">
                            <Text.Title2>반갑습니다!</Text.Title2>
                            <Text.Title1>
                                <Text.Title1_1>게스트하우스</Text.Title1_1> 또는 <Text.Title1_1>스텝</Text.Title1_1> 중{" "}
                                <br />
                                하나를 선택해주세요.
                            </Text.Title1>
                        </Wrapper.FlexBox>
                        <Wrapper.FlexBox gap="8.5px" justifyContent="center" margin="32px 0px 0px 0px">
                            <TypeButton
                                iconSrc="/icons/guesthouse.svg"
                                label="게스트하우스"
                                subLabel="Guesthouse"
                                isActive={selected === "GUESTHOUSE"}
                                onClick={() => setSelected("GUESTHOUSE")}
                            />
                            <TypeButton
                                iconSrc="/icons/staff.svg"
                                label="스텝"
                                subLabel="Staff"
                                isActive={selected === "STAFF"}
                                onClick={() => setSelected("STAFF")}
                            />
                        </Wrapper.FlexBox>
                    </div>
                    <Wrapper.FlexBox justifyContent="center">
                        <Button
                            label="가입 완료 버튼"
                            width="large"
                            onClick={handleSubmit}
                            disabled={!selected}
                            isActive={!!selected}
                        >
                            선택 완료
                        </Button>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
