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
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import MapComponent from "../components/Map";
import ImageCarousel from "@/components/ImageCarousel";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RecruitDetailPage() {
    const navigate = useNavigate();
    const [showAllBenefits, setShowAllBenefits] = useState(false);
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };
    const userType = useUserStore(state => state.type);
    const { employmentId } = useParams<{ employmentId: string }>();
    const { data: detail, isLoading, error } = useGetEmploymentDetail(Number(employmentId));
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
                <a
                    href={instarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
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

    return (
        <>
            <Header
                title="숙소 상세 정보"
                showBackButton
                rightIconSrc={userType === "GUESTHOUSE" ? "/icons/pencil.svg" : ""}
                onRightClick={userType === "GUESTHOUSE" ? handleEditClick : undefined}
            />

            <Wrapper.FlexBox direction="column" margin="43px 0 20px 0" gap="20px">
                {Array.isArray(images) && images.length > 0 && (
                    <ImageCarousel images={images} onImageClick={handleImageClick} />
                )}

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

                <Wrapper.FlexBox bgColor="#F8F8F8" borderRadius="4px" padding="14px 19px">
                    <Text.Body1>
                        <ExpandableText text={content} maxWidth={1200} />
                    </Text.Body1>
                </Wrapper.FlexBox>

                <Text.Body1_1 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    복리후생
                    {benefitsContent.length > 3 && (
                        <ArrowIcon
                            src={showAllBenefits ? "/icons/arrow_up.svg" : "/icons/arrow_down.svg"}
                            onClick={() => setShowAllBenefits(prev => !prev)}
                            alt="토글"
                        />
                    )}
                </Text.Body1_1>

                <BenefitListWrapper>
                    {(showAllBenefits ? benefitsContent : benefitsContent.slice(0, 3)).map(
                        (benefit: string, idx: number) => (
                            <BenefitItemBox key={idx}>
                                <ExpandableText text={benefit} maxWidth={140} />
                            </BenefitItemBox>
                        )
                    )}
                </BenefitListWrapper>

                <Wrapper.FlexBox alignItems="center" gap="4px">
                    <IconImage src="/icons/locationIcon.svg" alt="지역" />
                    {locationName}
                </Wrapper.FlexBox>
                <MapComponent latitude={latitude} longitude={longitude} />
            </Wrapper.FlexBox>
            {userType === "STAFF" && (
                <Wrapper.FlexBox gap="8px">
                    <ActionButton onClick={() => console.log("TODO: 전화번호 연결")} variant="call">
                        <ContentWrapper>
                            <Icon src="/icons/call.svg" alt="" aria-hidden />
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
                    >
                        <ContentWrapper>
                            <Icon src="/icons/envelope.svg" alt="" aria-hidden />
                            <Label $variant="apply">지원하기</Label>
                        </ContentWrapper>
                    </ActionButton>
                </Wrapper.FlexBox>
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

const BenefitItemBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    word-break: break-word;
    white-space: normal;
    padding: 10px 20px;
    background-color: ${theme.color.Gray0};
    border-radius: 8px;
`;
const ArrowIcon = styled.img`
    cursor: pointer;
    margin-left: 8px;
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
