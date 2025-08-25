import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "@/styles/Wrapper";

interface Props extends GuesthouseListItemProps {
    isEditActive?: boolean;
    isChecked?: boolean;
    onCheckToggle?: (employmentId: number) => void;
}

export const GuesthouseListItem = ({
    employmentId,
    image,
    hashtagName = [],
    title,
    content,
    locationName,
    personNum,
    sex,
    closed = false,
    isEditActive = false,
    isChecked = false,
    onCheckToggle,
}: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isEditActive) {
            navigate(`/guesthouse/${employmentId}`);
        }
    };

    const handleCheckToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCheckToggle?.(employmentId);
    };

    const hasImage = typeof image === "string" && image.length > 0;
    const safeHashtagName = Array.isArray(hashtagName) ? hashtagName : [];
    const hasHashtag = safeHashtagName.length > 0;
    const visibleHashtagCount = hasImage ? 2 : 3;
    const hiddenHashtagCount = safeHashtagName.length - visibleHashtagCount;
    const sexIconSrc =
        sex === "female" ? "/icons/onlyWoman.svg" : sex === "male" ? "/icons/onlyMan.svg" : "/icons/manAndWoman.svg";
    return (
        <Wrapper.FlexBox alignItems="center" gap="10px" onClick={handleCheckToggle}>
            {isEditActive && (
                <CheckBoxWrapper>
                    <img src={isChecked ? "/icons/circle.svg" : "/icons/emptyCircle.svg"} alt="선택 체크박스" />
                </CheckBoxWrapper>
            )}

            <Card onClick={handleClick}>
                {hasImage && (
                    <ImageWrapper $closed={closed}>
                        <StyledImage src={image} alt={title} />
                    </ImageWrapper>
                )}

                <ContentWrapper>
                    {hasHashtag && (
                        <TagWrapper>
                            {safeHashtagName.slice(0, visibleHashtagCount).map((tag, idx) => (
                                <Tag key={`${tag}-${idx}`}>
                                    <Text.Caption1 color="Gray4">{tag}</Text.Caption1>
                                </Tag>
                            ))}
                            {hiddenHashtagCount > 0 && (
                                <Tag>
                                    <Text.Body3_1 color="Gray4">+{hiddenHashtagCount}</Text.Body3_1>
                                </Tag>
                            )}
                        </TagWrapper>
                    )}

                    <Wrapper.FlexBox direction="column">
                        <Title>
                            <Text.Title3_1>{title}</Text.Title3_1>
                        </Title>

                        <Content>
                            <Text.Body3_1 color="Gray4">{content}</Text.Body3_1>
                        </Content>
                    </Wrapper.FlexBox>
                    <Footer hasImage={hasImage}>
                        {closed ? (
                            <IconText>
                                <img src="/icons/finished.svg" alt="마감됨" width={12} height={12} />
                                <Text.Body3 color="Gray4" style={{ margin: "1px 0 0 3px" }}>
                                    마감됨
                                </Text.Body3>
                            </IconText>
                        ) : (
                            <>
                                <IconText>
                                    <Icon src="/icons/locationIcon.svg" />

                                    <Location>
                                        <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                            {locationName}
                                        </Text.Body3>
                                    </Location>
                                </IconText>
                                <IconText>
                                    <Icon src={sexIconSrc} alt="모집 성별 아이콘" />

                                    <PersonNum>
                                        <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                            {sex === "female" ? "여자" : sex === "male" ? "남자" : "남녀"} {personNum}명
                                            모집
                                        </Text.Body3>
                                    </PersonNum>
                                </IconText>
                            </>
                        )}
                    </Footer>
                </ContentWrapper>
            </Card>
        </Wrapper.FlexBox>
    );
};

export const Card = styled.div`
    display: flex;
    gap: 12px;
    padding: 13px;
    border: 1px solid ${({ theme }) => theme.color.Gray1};
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    width: 100%;
    height: 115px;
    min-width: 0;
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
    min-width: 0;
    justify-content: space-between;
`;

const TagWrapper = styled.div`
    display: flex;
    gap: 4px;
    width: 100%;
    min-width: 0;
`;

const Tag = styled.div`
    display: flex;
    height: 18px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.Gray0};
    border-radius: 40px;
    padding: 0px 10px;
    max-width: 60px;
    & > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Title = styled.div`
    display: flex;
    min-width: 0;
    & > * {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
const Content = styled.div`
    display: flex;
    min-width: 0;
    & > * {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Location = styled.div`
    display: flex;
    min-width: 0;
    & > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    margin-right: 8px;
`;

const PersonNum = styled.div`
    display: flex;
    min-width: 0;
    & > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Footer = styled.div<{ hasImage: boolean }>`
    display: flex;
    align-items: center;
    min-width: 0;
    height: 10px;
`;

const IconText = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 0;
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
