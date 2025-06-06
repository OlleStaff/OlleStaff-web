import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useNavigate } from "react-router-dom";

export const GuesthouseListItem = ({
    id,
    imageUrl,
    tags,
    title,
    description,
    location,
    personnel,
    closed = false,
}: GuesthouseListItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!closed) navigate(`/guesthouse/${id}`);
    };

    return (
        <Card onClick={handleClick}>
            <ImageWrapper $closed={closed}>
                <StyledImage src={imageUrl} alt={title} />
            </ImageWrapper>
            <ContentWrapper>
                <TagWrapper>
                    {tags.slice(0, 2).map(tag => (
                        <Tag key={tag}>
                            <Text.Body3_1 color="Gray4">{tag}</Text.Body3_1>
                        </Tag>
                    ))}
                    {tags.length > 2 && (
                        <Tag>
                            <Text.Body3_1 color="Gray4">+{tags.length - 2}</Text.Body3_1>
                        </Tag>
                    )}
                </TagWrapper>
                <Text.Title3_1>{title}</Text.Title3_1>
                <Text.Body3_1 color="Gray4">{description}</Text.Body3_1>
                <Footer>
                    {closed ? (
                        <IconText>
                            <img src="/icons/unChecked.svg" alt="마감됨" width={12} height={12} />
                            <Text.Body3 color="Gray4" style={{ marginTop: "2px" }}>
                                마감됨
                            </Text.Body3>
                        </IconText>
                    ) : (
                        <>
                            <IconText>
                                <Icon src="/icons/locationIcon.svg" />
                                <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                    {location}
                                </Text.Body3>
                            </IconText>
                            <IconText>
                                <Icon src="/icons/groupIcon.svg" />
                                <Text.Body3 color="Gray4" style={{ marginTop: "1px" }}>
                                    {personnel}
                                </Text.Body3>
                            </IconText>
                        </>
                    )}
                </Footer>
            </ContentWrapper>
        </Card>
    );
};

const Card = styled.div`
    display: flex;
    gap: 12px;
    padding: 13px 30px 12px 12px;
    border: 1px solid ${({ theme }) => theme.color.Gray1};
    border-radius: 8px;
    background-color: white;

    cursor: pointer;
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
`;

const TagWrapper = styled.div`
    display: flex;
    gap: 4px;
    margin-bottom: 4px;
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
    gap: 8px;
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
