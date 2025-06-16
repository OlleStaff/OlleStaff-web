import { useState } from "react";
import styled from "@emotion/styled";
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import TabSelector from "@/components/TabSelector";
import { Text } from "@/styles/Text";
import { useFetchMyApplication } from "@/hooks/staff/useFetchMyApplication";
import { useFetchUserProfile } from "@/hooks/staff/useFetchUserProfile";
import { Wrapper } from "@/styles/Wrapper";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import ImageViewer from "@/components/ImageViewer";
import UniformImageGrid from "@/components/UniformImageGrid";
import SectionTitle from "@/components/SectionTitle";
import Textarea from "@/components/Textarea";
import { useClipboard } from "@/hooks/useClipboard";

export default function ApplicationView() {
    const [tab, setTab] = useState<StaffTabTypes["MY_APPLICATION"]>("자기소개");
    const { copy } = useClipboard();

    const { data: application, isLoading: isAppLoading } = useFetchMyApplication();
    const { data: profile, isLoading: isProfileLoading } = useFetchUserProfile();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isViewerOpen, setViewerOpen] = useState(false);

    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    if (isAppLoading || isProfileLoading || !application || !profile) return null;

    return (
        <>
            <Header showBackButton title="나의 지원서" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" alignItems="center" margin="0px 0px 24px 0px">
                    <ProfileImage src={application.profileImage} alt="프로필 이미지" />
                    <Text.Title3_1 style={{ marginTop: "12px" }}>{application.nickname}</Text.Title3_1>
                    <Text.Body3_1 color="Gray3">
                        {profile.birthDate} <Text.Body3_1 color="Main"> ({application.mbti})</Text.Body3_1>
                    </Text.Body3_1>
                    <Wrapper.FlexBox direction="column" justifyContent="center" gap="12px" margin="24px 0px 0px 0px">
                        <Text.Body2_1 color="Gray5">
                            <Icon src="/icons/call.svg" />
                            {profile.phone}
                        </Text.Body2_1>
                        <Text.Body2_1 color="Gray5">
                            <Icon src="/icons/insta.svg" />
                            {application.link}
                        </Text.Body2_1>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>

                <TabSelector
                    labels={[...TAB_LABELS.STAFF.MY_APPLICATION]}
                    selected={tab}
                    onChange={label => setTab(label as StaffTabTypes["MY_APPLICATION"])}
                    variant="underline"
                />

                {tab === "자기소개" ? (
                    <Wrapper.FlexBox direction="column" margin="24px 0px" gap="12px">
                        <SectionTitle
                            title="자기소개 및 지원동기"
                            type="copy"
                            onCopyClick={() => copy(application.introduction)}
                        />
                        <Textarea value={application.introduction} onChange={() => {}} disabled variant="flat" />
                    </Wrapper.FlexBox>
                ) : (
                    <>
                        <Wrapper.FlexBox direction="column" margin="24px 0px" gap="12px">
                            <SectionTitle
                                title="어필사항 및 경력사항"
                                type="copy"
                                onCopyClick={() => copy(application.appeal)}
                            />
                            <Textarea value={application.appeal} onChange={() => {}} disabled variant="flat" />
                        </Wrapper.FlexBox>
                        <UniformImageGrid images={application.images} onImageClick={handleImageClick} />
                        {isViewerOpen && (
                            <ImageViewer
                                images={application.images}
                                startIndex={currentImageIndex}
                                onClose={() => setViewerOpen(false)}
                            />
                        )}
                    </>
                )}
            </PageWrapper>
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
