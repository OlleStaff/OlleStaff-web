import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useNavigate } from "react-router-dom";
import { truncateText } from "@/utils/truncateText";
import { Wrapper } from "@/styles/Wrapper";

interface Props extends GuesthouseListItemProps {
    isTrashIconActive?: boolean;
    isChecked?: boolean;
    onCheckToggle?: (employmentId: number) => void;
}

export const GuesthouseListItem = ({
    employmentId,
    image,
    hashtagName,
    title,
    content,
    locationName,
    personNum,
    sex,
    closed = false,
    isTrashIconActive = false,
    isChecked = false,
    onCheckToggle,
}: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isTrashIconActive) {
            navigate(`/guesthouse/${employmentId}`);
        }
    };

    const handleCheckToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCheckToggle?.(employmentId);
    };

    return (
        <Wrapper.FlexBox alignItems="center" gap="10px">
            {isTrashIconActive && (
                <CheckBoxWrapper onClick={handleCheckToggle}>
                    <img src={isChecked ? "/icons/circle.svg" : "/icons/emptyCircle.svg"} alt="선택 체크박스" />
                </CheckBoxWrapper>
            )}

            <Card onClick={handleClick}>
                <ImageWrapper $closed={closed}>
                    <StyledImage src={image} alt={title} />
                </ImageWrapper>
                <ContentWrapper>
                    <TagWrapper>
                        {hashtagName.slice(0, 2).map(tag => (
                            <Tag key={tag}>
                                <Text.Body3_1 color="Gray4">
                                    {truncateText(tag, isTrashIconActive ? 2 : 4)}
                                </Text.Body3_1>
                            </Tag>
                        ))}
                        {hashtagName.length > 2 && (
                            <Tag>
                                <Text.Body3_1 color="Gray4">+{hashtagName.length - 2}</Text.Body3_1>
                            </Tag>
                        )}
                    </TagWrapper>
                    <Wrapper.FlexBox direction="column">
                        <Text.Title3_1>{truncateText(title, isTrashIconActive ? 9 : 11)}</Text.Title3_1>
                        <Text.Body3_1 color="Gray4">{truncateText(content, isTrashIconActive ? 15 : 18)}</Text.Body3_1>
                    </Wrapper.FlexBox>
                    <Footer>
                        {closed ? (
                            <IconText>
                                <img src="/icons/unChecked.svg" alt="마감됨" width={12} height={12} />
                                <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                    마감됨
                                </Text.Body3>
                            </IconText>
                        ) : (
                            <>
                                <IconText>
                                    <Icon src="/icons/locationIcon.svg" />
                                    <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                        {truncateText(locationName, isTrashIconActive ? 5 : 9)}
                                    </Text.Body3>
                                </IconText>
                                <IconText>
                                    <Icon src="/icons/groupIcon.svg" />
                                    <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                        {sex === "female" ? "여자" : sex === "male" ? "남자" : "전체"} {personNum}명
                                        모집
                                    </Text.Body3>
                                </IconText>
                            </>
                        )}
                    </Footer>
                </ContentWrapper>
            </Card>
        </Wrapper.FlexBox>
    );
};

const Card = styled.div`
    display: flex;
    gap: 12px;
    padding: 13px;
    border: 1px solid ${({ theme }) => theme.color.Gray1};
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    width: 100%;
`;

const ImageWrapper = styled.div<{ $closed: boolean }>`
    width: 88px;
    height: 88px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    opacity: ${({ $closed }) => ($closed ? 0.5 : 1)};
    pointer-events: ${({ $closed }) => ($closed ? "none" : "auto")};
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
`;

const TagWrapper = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
`;

const Tag = styled.div`
    display: flex;
    height: 18px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.Gray0};
    border-radius: 40px;
    padding: 0px 10px;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 14px;
`;

const IconText = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

const Icon = styled.img`
    width: 12px;
    height: 12px;
`;
const CheckBoxWrapper = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;
