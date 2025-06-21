import { Button } from "@/components/Button";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const userType = useUserStore(state => state.type);

    const handleGoBack = () => {
        if (userType === "STAFF") {
            navigate("/staff");
        } else if (userType === "GUESTHOUSE") {
            navigate("/owner");
        } else {
            console.warn("알 수 없는 사용자 유형입니다.");
            navigate("/");
        }
    };
    return (
        <>
            <Wrapper.FlexBox
                width="100%"
                height="100%"
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap="23px"
            >
                <img src="/icons/oops.svg" alt="404페이지" style={{ width: "32px" }} />
                <Wrapper.FlexBox gap="8px" direction="column" alignItems="center">
                    <Text.Title3_1 color="Gray3">페이지를 찾을 수 없습니다.</Text.Title3_1>
                    <Text.Body2_1 color="Gray3">죄송합니다. 더 이상 존재하지 않는 페이지 입니다.</Text.Body2_1>
                </Wrapper.FlexBox>
                <Wrapper.FlexBox width="138px">
                    <Button label="인증 완료 버튼" width="large" height="large" onClick={handleGoBack} isActive={true}>
                        돌아가기
                    </Button>
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>
        </>
    );
}
