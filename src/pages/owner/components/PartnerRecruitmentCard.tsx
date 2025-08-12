import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useNavigate } from "react-router-dom";

interface Props {
    data: GuesthouseListItemProps[];
}

export default function PartnerRecruitmentCard({ data }: Props) {
    const navigate = useNavigate();

    const handleWriteRecruitPost = () => {
        navigate("/owner/recruit/write/step1");
    };
    return (
        <>
            <Wrapper.FlexBox
                direction="column"
                padding="16px 20px 12px 20px "
                border="1px solid #02CCDA"
                borderRadius="12px"
                gap="10px"
                bgColor="white"
            >
                <Wrapper.FlexBox
                    justifyContent="center"
                    borderRadius="4px"
                    width="200px"
                    padding="6px 16px"
                    bgColor="#EDFEFF"
                >
                    <Text.Body2_1 color="Gray4">
                        현재 진행 중인 공고 <Text.Body2_1 color="Main"> {data.length}개</Text.Body2_1>
                    </Text.Body2_1>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox direction="column" gap="3px">
                    <Text.Title2_1>같이 일할 사람을 찾고 있다면?</Text.Title2_1>
                    <Text.Body1 color="Gray4">지금 바로 글을 작성해 보세요 ✍🏻</Text.Body1>
                </Wrapper.FlexBox>
                <Button label="작성 버튼" isActive width="large" onClick={handleWriteRecruitPost}>
                    게시글 작성하기
                </Button>
            </Wrapper.FlexBox>
        </>
    );
}
