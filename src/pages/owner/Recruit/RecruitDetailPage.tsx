import { useNavigate, useParams } from "react-router-dom";
import { Text } from "@/styles/Text";
import Header from "@/components/Header";
import { useUserStore } from "@/store/useUserStore";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { calculateDDay, formatDateToMonthDay } from "@/utils/date";
import { truncateText } from "@/utils/truncateText";
import ExpandableText from "@/components/ExpandableText";
import { useEffect, useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import MapComponent from "../components/Map";
import ImageCarousel from "@/components/ImageCarousel";
import { useDeleteLikeRecruit, useGetEmploymentDetail, usePostLikeRecruit } from "@/hooks/owner/employment";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";

export default function RecruitDetailPage() {
    const navigate = useNavigate();
    const [showAllBenefits, setShowAllBenefits] = useState(false);
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };
    const { employmentId } = useParams<{ employmentId: string }>();
    const { data: detail, isLoading, error } = useGetEmploymentDetail(Number(employmentId));
    const [isLikeRecruitButtonClicked, setIsLikeRecruitButtonClicked] = useState<boolean>(!!detail?.data.heart);
    useEffect(() => {
        if (detail?.data) setIsLikeRecruitButtonClicked(!!detail.data.heart);
    }, [detail?.data?.heart]);

    const { mutate: likeRecruit, isPending: isLikePending } = usePostLikeRecruit();
    const { mutate: unlikeRecruit, isPending: isUnlikePending } = useDeleteLikeRecruit();
    const isMutating = isLikePending || isUnlikePending;
    const handleToggleLikeRecruit = () => {
        if (!employmentId || isMutating) return;

        if (!isLikeRecruitButtonClicked) {
            likeRecruit(Number(employmentId), {
                onSuccess: () => setIsLikeRecruitButtonClicked(true),
                // onError: () => showToast("실패했습니다. 다시 시도해주세요."),
            });
        } else {
            unlikeRecruit(Number(employmentId), {
                onSuccess: () => setIsLikeRecruitButtonClicked(false),
                // onError: () => showToast("실패했습니다. 다시 시도해주세요."),
            });
        }
    };

    const mode = useUserStore(s => s.mode);

    if (!detail?.data || isLoading) return <LoadingSpinner />;
    if (error) navigate("/404");
    const {
        instarUrl,
        personNum,
        sex,
        startedAt,
        endedAt,
        recruitmentEnd,
        title,
        content,
        locationName,
        hashtagName,
        images,
        benefitsContent,
        latitude,
        longitude,
        phoneNum,
        rating,
        reviewCount,
    } = detail.data;

    const handleEditClick = () => {
        navigate(`/owner/recruit/edit/${employmentId}/step1`, {
            state: detail.data,
        });
    };

    const metaItems = [
        {
            icon: "/icons/link.svg",
            label: (
                <a href={instarUrl} target="_blank">
                    {truncateText(instarUrl, 25)}
                </a>
            ),
            alt: "인스타그램",
        },
        {
            icon: "/icons/addressBook.svg",
            label: `${sex === "female" ? "여자" : sex === "male" ? "남자" : "전체"} ${personNum}명 모집`,
            alt: "모집 성별",
        },
        {
            icon: "/icons/calendar.svg",
            label: `${formatDateToMonthDay(startedAt)} ~ ${formatDateToMonthDay(endedAt)}`,
            alt: "활동 기간",
        },
        {
            icon: "/icons/hourglass.svg",
            label: `${formatDateToMonthDay(recruitmentEnd)}까지`,
            alt: "모집 마감일",
        },
    ];

    const handleClickReview = () => {
        navigate(mode === "GUESTHOUSE" ? "/owner/userinfo/reviews" : "/staff/user/my-reviews");
    };
    return (
        <>
            <Header
                title="숙소 상세 정보"
                showBackButton
                rightIconSrc={mode === "GUESTHOUSE" ? "/icons/pencil.svg" : ""}
                onRightClick={mode === "GUESTHOUSE" ? handleEditClick : undefined}
            />

            <Wrapper.FlexBox direction="column" margin="43px 0 20px 0" gap="20px">
                <Wrapper.RelativeBox>
                    {Array.isArray(images) && images.length > 0 && (
                        <>
                            <ImageCarousel images={images} onImageClick={handleImageClick} />
                            {mode === "STAFF" && (
                                <LikeRecruitButton onClick={handleToggleLikeRecruit} aria-disabled={isMutating}>
                                    {isLikeRecruitButtonClicked ? (
                                        <img src="/icons/blueHeart.svg" alt="좋아요" />
                                    ) : (
                                        <img src="/icons/emptyHeart.svg" alt="좋아요" />
                                    )}
                                </LikeRecruitButton>
                            )}
                        </>
                    )}
                </Wrapper.RelativeBox>

                {isViewerOpen && (
                    <ImageViewer images={images} startIndex={currentImageIndex} onClose={() => setViewerOpen(false)} />
                )}

                {Array.isArray(hashtagName) && hashtagName.length > 0 && (
                    <Wrapper.FlexBox gap="6px" style={{ flexWrap: "wrap" }}>
                        {hashtagName.map((tag, idx) => (
                            <HashTag key={idx}>
                                <Text.Body2 color="Main"># {tag}</Text.Body2>
                            </HashTag>
                        ))}
                    </Wrapper.FlexBox>
                )}

                <Text.Title1_1>{title}</Text.Title1_1>
                <Wrapper.FlexBox onClick={handleClickReview} pointer>
                    <Wrapper.FlexBox gap="5px" width="75px" height="20px">
                        <img src="/icons/fullStar.svg" alt="별점" />
                        <Text.Body1_1>{Number.isNaN(Number(rating)) ? "0.0" : rating}</Text.Body1_1>
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox gap="8px">
                        <Text.Body1_1 color="Gray4">{reviewCount}개의 리뷰 </Text.Body1_1>
                        <img src="/icons/arrow.svg" alt="별점" />
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox direction="column" gap="7px">
                    <Wrapper.FlexBox justifyContent="space-between">
                        {metaItems.slice(0, 2).map((item, index) => (
                            <Meta key={index}>
                                <IconImage src={item.icon} alt={item.alt} />
                                <Text.Body2_1 color="Gray4">{item.label}</Text.Body2_1>
                            </Meta>
                        ))}
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox justifyContent="space-between">
                        {metaItems.slice(2).map((item, index) => (
                            <Meta key={index + 2}>
                                <IconImage src={item.icon} alt={item.alt} />
                                <Text.Body2_1 color="Gray4">{item.label}</Text.Body2_1>
                            </Meta>
                        ))}

                        <DDayWrapper>
                            <Text.Body3_1 color="White">{calculateDDay(recruitmentEnd)}</Text.Body3_1>
                        </DDayWrapper>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox>
                    <ContentBox>
                        <Text.Body1>
                            <ExpandableText text={content} maxWidth={1100} />
                        </Text.Body1>
                    </ContentBox>
                </Wrapper.FlexBox>

                <BenefitListWrapper>
                    <Wrapper.FlexBox alignItems="center" justifyContent="space-between">
                        <Text.Body1_1>복리후생</Text.Body1_1>
                        {benefitsContent.length > 3 && (
                            <ArrowIcon
                                src={showAllBenefits ? "/icons/arrow_up.svg" : "/icons/arrow_down.svg"}
                                onClick={() => setShowAllBenefits(prev => !prev)}
                                alt="토글"
                            />
                        )}
                    </Wrapper.FlexBox>
                    {(showAllBenefits ? benefitsContent : benefitsContent.slice(0, 3)).map(
                        (benefit: string, idx: number) => (
                            <BenefitBox key={idx}>
                                <ExpandableText text={benefit} maxWidth={140} />
                            </BenefitBox>
                        )
                    )}
                </BenefitListWrapper>

                <Wrapper.FlexBox alignItems="center" gap="4px">
                    <IconImage src="/icons/locationIcon.svg" alt="지역" />
                    {locationName}
                </Wrapper.FlexBox>
                <MapComponent latitude={latitude} longitude={longitude} />
            </Wrapper.FlexBox>
            {mode === "STAFF" && (
                <Wrapper.FlexBox gap="8px" padding="24px 0px 0px 0px">
                    <ActionButton onClick={() => setPhoneModalOpen(true)} variant="call">
                        <ContentWrapper>
                            <Icon src="/icons/call.svg" aria-hidden alt="전화 아이콘" />
                            <Label $variant="call">전화문의</Label>
                        </ContentWrapper>
                    </ActionButton>

                    <ActionButton
                        onClick={() =>
                            navigate("/user/application", {
                                state: { fromRecruit: true, employmentId },
                            })
                        }
                        variant="apply"
                        disabled={calculateDDay(recruitmentEnd) === "마감됨"}
                    >
                        <ContentWrapper>
                            <Icon src="/icons/envelope.svg" aria-hidden alt="지원 아이콘" />
                            <Label $variant="apply">지원하기</Label>
                        </ContentWrapper>
                    </ActionButton>
                </Wrapper.FlexBox>
            )}

            {isPhoneModalOpen && (
                <Modal
                    variant="confirm"
                    title="연락처"
                    message={phoneNum ? phoneNum : "등록된 연락처가 없습니다."}
                    cancelText="닫기"
                    confirmText={phoneNum ? "전화 걸기" : "확인"}
                    handleModalClose={() => setPhoneModalOpen(false)}
                    onConfirm={() => {
                        if (phoneNum) {
                            window.location.href = `tel:${phoneNum}`;
                        }
                        setPhoneModalOpen(false);
                    }}
                />
            )}
        </>
    );
}

const IconImage = styled.img`
    width: 16px;
    height: 16px;
`;
const HashTag = styled.div`
    width: auto;
    padding: 2px 10px;
    background-color: ${theme.color.Sub2};
    border-radius: 40px;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const DDayWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 10px;
    background-color: ${theme.color.Main};
    border-radius: 52px;
`;

const ContentBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    word-break: break-word;
    white-space: normal;
    padding: 10px 20px;
    background-color: ${theme.color.Gray0};
    border-radius: 8px;
    width: 100%;
    height: 100%;
    max-height: 284px;
    min-height: 164px;
    overflow-y: scroll;
    scrollbar-width: none;
`;
const BenefitBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    word-break: break-word;
    white-space: normal;
    padding: 10px 20px;
    background-color: ${theme.color.Gray0};
    border-radius: 8px;
    width: 100%;
`;

const ArrowIcon = styled.img`
    cursor: pointer;
`;

const BenefitListWrapper = styled.ul`
    display: flex;
    flex-direction: column;

    gap: 8px;
`;

const ActionButton = styled.button<{ variant?: "call" | "apply" }>`
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 8px;
    background: ${({ variant, theme }) => (variant === "call" ? theme.color.Gray1 : theme.color.Main)};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 16px;
    &:disabled {
        background-color: #e4e4e4;
        cursor: not-allowed;
    }
`;

const ContentWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
    padding: 5px;
    object-fit: contain;
`;

const Label = styled(Text.Body1_1)<{ $variant: "call" | "apply" }>`
    color: ${({ $variant, theme }) => ($variant === "call" ? theme.color.Black : theme.color.White)};
    line-height: 20px;
`;

const LikeRecruitButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 22px 20px;
    cursor: pointer;
    z-index: 1;
`;
