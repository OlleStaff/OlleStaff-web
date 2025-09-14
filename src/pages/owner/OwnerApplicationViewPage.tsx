import { useState } from "react";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import TabSelector from "@/components/TabSelector";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import ImageViewer from "@/components/ImageViewer";
import UniformImageGrid from "@/components/UniformImageGrid";
import SectionTitle from "@/components/SectionTitle";
import Textarea from "@/components/Textarea";
import { useClipboard } from "@/hooks/useClipboard";
import { useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetOtherUserApplication } from "@/chat/hooks/useGetUserApplication";
import { formatProfileMeta } from "@/utils/formatProfileMeta";
import { formatPhoneNumberKR } from "@/utils/formatPhoneNumberKR";
import { truncateText } from "@/utils/truncateText";

export default function OwnerApplicationViewPage() {
    const { state } = useLocation() as {
        state?: { targetUserId?: number; fromChat?: boolean };
    };
    const { userId: userIdParam } = useParams();
    const targetUserId = state?.targetUserId ?? (userIdParam ? Number(userIdParam) : undefined);

    const { copy } = useClipboard();
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [tab, setTab] = useState<StaffTabTypes["MY_APPLICATION"]>("자기소개");

    const { data: otherUserApplication, isLoading, isError } = useGetOtherUserApplication(targetUserId as number);

    if (!Number.isFinite(targetUserId)) {
        return <div style={{ padding: 16 }}>잘못된 접근입니다.</div>;
    }
    if (isLoading) return <LoadingSpinner />;
    if (isError || !otherUserApplication) {
        return <div style={{ padding: 16 }}>지원서를 불러오지 못했습니다.</div>;
    }

    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    return (
        <>
            <Header showBackButton title={`${otherUserApplication.nickname}님의 지원서`} />

            <Wrapper.FlexBox direction="column" margin="42px 0 0 0">
                <div>
                    <Wrapper.FlexBox direction="column" alignItems="center" margin="0 0 24px 0">
                        <ProfileImage
                            src={otherUserApplication.profileImage ?? "/icons/defaultUser.svg"}
                            alt="프로필 이미지"
                        />
                        <Text.Title3_1 style={{ marginTop: 12 }}>{otherUserApplication.nickname}</Text.Title3_1>

                        <Wrapper.FlexBox gap="5px" justifyContent="center">
                            <Text.Body3_1 color="Main">{otherUserApplication.mbti}</Text.Body3_1>
                            <Text.Body3_1 color="Gray2">
                                | {formatProfileMeta(otherUserApplication.birthDate, otherUserApplication.gender)}
                            </Text.Body3_1>
                        </Wrapper.FlexBox>

                        <Wrapper.FlexBox direction="column" justifyContent="center" gap="12px" margin="24px 0 0 0">
                            <Text.Body2_1 color="Gray5">
                                <Icon src="/icons/call.svg" alt="전화 아이콘" />
                                {formatPhoneNumberKR(otherUserApplication.phone)}
                            </Text.Body2_1>

                            {otherUserApplication.link && otherUserApplication.link.trim() !== "" && (
                                <Text.Body2_1 color="Gray5">
                                    <Icon src="/icons/insta.svg" alt="인스타 아이콘" />
                                    <a href={otherUserApplication.link} target="_blank">
                                        {truncateText(otherUserApplication.link, 45)}
                                    </a>
                                </Text.Body2_1>
                            )}
                        </Wrapper.FlexBox>
                    </Wrapper.FlexBox>

                    <TabSelector
                        labels={[...TAB_LABELS.STAFF.MY_APPLICATION]}
                        selected={tab}
                        onChange={label => setTab(label as StaffTabTypes["MY_APPLICATION"])}
                        variant="underline"
                    />

                    {tab === "자기소개" ? (
                        <Wrapper.FlexBox direction="column" margin="24px 0" gap="12px">
                            <SectionTitle
                                title="자기소개 및 지원동기"
                                link=""
                                type="copy"
                                onCopyClick={() => copy(otherUserApplication.introduction)}
                            />
                            <Textarea
                                value={otherUserApplication.introduction}
                                onChange={() => {}}
                                disabled
                                variant="flat"
                            />
                        </Wrapper.FlexBox>
                    ) : (
                        <>
                            <Wrapper.FlexBox direction="column" margin="24px 0" gap="12px">
                                <SectionTitle
                                    title="어필사항 및 경력사항"
                                    link=""
                                    type="copy"
                                    onCopyClick={() => copy(otherUserApplication.appeal)}
                                />
                                <Textarea
                                    value={otherUserApplication.appeal}
                                    onChange={() => {}}
                                    disabled
                                    variant="flat"
                                />
                            </Wrapper.FlexBox>
                            <UniformImageGrid
                                images={otherUserApplication.images ?? []}
                                onImageClick={handleImageClick}
                            />
                            {isViewerOpen && (
                                <ImageViewer
                                    images={otherUserApplication.images ?? []}
                                    startIndex={currentImageIndex}
                                    onClose={() => setViewerOpen(false)}
                                />
                            )}
                        </>
                    )}
                </div>
            </Wrapper.FlexBox>
        </>
    );
}

const ProfileImage = styled.img`
    width: 88px;
    height: 88px;
    border-radius: 12px;
    object-fit: cover;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    padding: 3px;
    margin-right: 4px;
    vertical-align: middle;
`;
