import { useNavigate, useParams } from "react-router-dom";
import { Text } from "@/styles/Text";
import { useEmploymentDetail } from "@/hooks/owner/employment/useEmploymentDetail";
import Header from "@/components/Header";
import { useUserStore } from "@/store/useUserStore";
import { Wrapper } from "@/styles/Wrapper";
import PageWrapper from "@/components/PageWrapper";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { calculateDDay, formatDateToMonthDay } from "@/utils/date";
import { truncateText } from "@/utils/truncateText";
import ExpandableText from "@/components/ExpandableText";
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import MapComponent from "../components/Map";
import ImageCarousel from "@/components/ImageCarousel";

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
    const { data: detail, isLoading, error } = useEmploymentDetail(Number(employmentId));
    if (!detail?.data || isLoading) return <p>불러오는 중...</p>;
    if (error) return <p>불러오기 실패</p>;
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
        navigate(`/owner/recruit/edit/${employmentId}/step1`);
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
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" padding="30px" gap="20px">
                    {Array.isArray(images) && images.length > 0 && (
                        <ImageCarousel images={images} onImageClick={handleImageClick} />
                    )}

                    {isViewerOpen && (
                        <ImageViewer
                            images={images}
                            startIndex={currentImageIndex}
                            onClose={() => setViewerOpen(false)}
                        />
                    )}

                    <Wrapper.FlexBox gap="6px" style={{ flexWrap: "wrap" }}>
                        {Array.isArray(hashtagName) &&
                            hashtagName.map((tag, idx) => (
                                <HashTag key={idx}>
                                    <Text.Body2 color="Main"># {tag}</Text.Body2>
                                </HashTag>
                            ))}
                    </Wrapper.FlexBox>

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
                            <ExpandableText text={content} maxLength={135} />
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
                                <BenefitItemBox key={idx}>{benefit}</BenefitItemBox>
                            )
                        )}
                    </BenefitListWrapper>

                    <Wrapper.FlexBox alignItems="center" gap="4px">
                        <IconImage src="/icons/locationIcon.svg" alt="지역" />
                        {locationName}
                    </Wrapper.FlexBox>
                    <MapComponent latitude={latitude} longitude={longitude} />
                </Wrapper.FlexBox>
            </PageWrapper>
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
    height: 40px;
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
