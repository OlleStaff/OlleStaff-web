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
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import theme from "@/styles/theme";
import api from "@/apis/axios";

export default function ApplicationViewPage() {
    const { state } = useLocation() as { state?: { fromRecruit?: boolean; employmentId?: string } };
    const fromRecruit = !!state?.fromRecruit;
    const employmentId = state?.employmentId;
    const [tab, setTab] = useState<StaffTabTypes["MY_APPLICATION"]>("자기소개");
    const { copy } = useClipboard();
    const navigate = useNavigate();

    const { data: application, isLoading: isAppLoading } = useFetchMyApplication();
    const { data: profile, isLoading: isProfileLoading } = useFetchUserProfile();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isCompleteOpen, setIsCompleteOpen] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const onClickApply = () => setIsConfirmOpen(true);

    const handleConfirmApply = async () => {
        if (!employmentId || isApplying) return;
        setIsApplying(true);
        try {
            await api.post(
                `/apply`,
                {},
                {
                    params: { employmentId },
                }
            );
            setIsCompleteOpen(true);
        } catch (err) {
            console.error("지원 실패", err);
            alert("지원에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsApplying(false);
        }
    };
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    const onEditClick = () => {
        navigate("/staff/user/edit-application");
    };

    if (isAppLoading || isProfileLoading || !application || !profile) return null;

    return (
        <>
            <Header
                showBackButton
                title="나의 지원서"
                rightIconSrc={fromRecruit ? undefined : "/icons/pencil.svg"}
                onRightClick={fromRecruit ? undefined : onEditClick}
            />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox
                    direction="column"
                    justifyContent="space-between"
                    height={`calc(100vh - ${theme.size.HeaderHeight})`}
                >
                    <div>
                        <Wrapper.FlexBox direction="column" alignItems="center" margin="0px 0px 24px 0px">
                            <ProfileImage src={application.profileImage} alt="프로필 이미지" />
                            <Text.Title3_1 style={{ marginTop: "12px" }}>{application.nickname}</Text.Title3_1>
                            <Text.Body3_1 color="Gray3">
                                {profile.birthDate} <Text.Body3_1 color="Main"> ({application.mbti})</Text.Body3_1>
                            </Text.Body3_1>
                            <Wrapper.FlexBox
                                direction="column"
                                justifyContent="center"
                                gap="12px"
                                margin="24px 0px 0px 0px"
                            >
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
                                    link=""
                                    type="copy"
                                    onCopyClick={() => copy(application.introduction)}
                                />
                                <Textarea
                                    value={application.introduction}
                                    onChange={() => {}}
                                    disabled
                                    variant="flat"
                                />
                            </Wrapper.FlexBox>
                        ) : (
                            <>
                                <Wrapper.FlexBox direction="column" margin="24px 0px" gap="12px">
                                    <SectionTitle
                                        title="어필사항 및 경력사항"
                                        link=""
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
                    </div>

                    {fromRecruit && (
                        <Wrapper.FlexBox padding="10px 0px 40px 0px" justifyContent="center">
                            <Button label="지원 완료 버튼" width="large" isActive onClick={onClickApply}>
                                지원 완료
                            </Button>
                        </Wrapper.FlexBox>
                    )}
                </Wrapper.FlexBox>
            </PageWrapper>

            {isConfirmOpen && (
                <Modal
                    variant="confirm"
                    title="지원서를 전송하시겠습니까?"
                    message={
                        <>
                            확인 버튼 클릭 시 지원서가 전송되어
                            <br />
                            게스트하우스 스텝 지원이 완료가 됩니다.
                        </>
                    }
                    cancelText="취소"
                    confirmText="확인"
                    handleModalClose={() => setIsConfirmOpen(false)}
                    onConfirm={handleConfirmApply}
                />
            )}

            {isCompleteOpen && (
                <Modal
                    variant="default"
                    title="스텝 지원 완료!"
                    confirmText="확인"
                    handleModalClose={() => {
                        setIsCompleteOpen(false);
                        navigate(-1);
                    }}
                    onConfirm={() => {
                        setIsCompleteOpen(false);
                        navigate(-1);
                    }}
                />
            )}
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
