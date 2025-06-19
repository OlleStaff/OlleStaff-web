import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { useNavigate } from "react-router-dom";
import { AccompanyListItemProps } from "@/types/accompany";
import { timeAgo } from "@/utils/date";
import { Wrapper } from "@/styles/Wrapper";

export const AccompanyListItem = ({
    id,
    title,
    content,
    createdAt,
    updatedAt,
    images,
    userNickname,
    likeCount,
    commentCount,
    userImage,
}: AccompanyListItemProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/staff/accompany/${id}`, {
            state: {
                accompany: {
                    id,
                    title,
                    content,
                    createdAt,
                    updatedAt,
                    images,
                    userNickname,
                    likeCount,
                    commentCount,
                    userImage,
                },
            },
        });
    };

    const thumbnail = images?.[0];

    return (
        <Card onClick={handleClick}>
            {thumbnail && (
                <ImageWrapper>
                    <StyledImage src={thumbnail} alt="thumbnail" />
                </ImageWrapper>
            )}
            <Wrapper.FlexBox direction="column" justifyContent="space-between">
                <Text.Title3_1>{title}</Text.Title3_1>
                <Text.Body3_1
                    color="Gray4"
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: "40px",
                    }}
                >
                    {content}
                </Text.Body3_1>
                <Wrapper.FlexBox justifyContent="space-between">
                    <Wrapper.FlexBox justifyContent="space-between" gap="4px" width="fit">
                        <Wrapper.FlexBox alignItems="center">
                            <Icon src="/icons/comment.svg" alt="comment" />
                            <Text.Body2_1 color="Gray4" style={{ marginTop: "4px" }}>
                                {commentCount}
                            </Text.Body2_1>
                        </Wrapper.FlexBox>
                        <Wrapper.FlexBox alignItems="center">
                            <Icon src="/icons/heart.svg" alt="heart" />
                            <Text.Body2_1 color="Gray4" style={{ marginTop: "4px" }}>
                                {likeCount}
                            </Text.Body2_1>
                        </Wrapper.FlexBox>
                    </Wrapper.FlexBox>
                    <Text.Body3 color="Gray4" style={{ marginTop: "4px" }}>
                        {timeAgo(createdAt)}
                    </Text.Body3>
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>
        </Card>
    );
};

const Card = styled.div`
    display: flex;
    gap: 12px;
    padding: 13px 16px 9px 16px;
    border: 1px solid #f0f0f5;
    border-radius: 8px;
    background-color: white;
    height: 112px;
`;

const ImageWrapper = styled.div`
    width: 88px;
    height: 88px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;
