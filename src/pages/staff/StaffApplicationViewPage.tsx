import { useState } from "react";
import styled from "@emotion/styled";
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
import { formatPhoneNumberKR } from "@/utils/formatPhoneNumberKR";
import { truncateText } from "@/utils/truncateText";
import { AxiosError } from "axios";
import Oops from "@/components/Oops";
import { useApplicationApply } from "@/hooks/staff/useApplicationApply";

export default function StaffApplicationViewPage() {
    const { state } = useLocation() as {
        state?: { fromRecruit?: boolean; employmentId?: string; targetUserId?: number; fromChat?: boolean };
    };
    const fromRecruit = !!state?.fromRecruit;
    const fromChat = !!state?.fromChat;
    const employmentId = state?.employmentId;
    const [tab, setTab] = useState<StaffTabTypes["MY_APPLICATION"]>("자기소개");
    const { copy } = useClipboard();
    const navigate = useNavigate();

    const { data: application, isError, error, isLoading: isAppLoading } = useFetchMyApplication();
    const { data: profile, isLoading: isProfileLoading } = useFetchUserProfile();
    const { mutate: applyRecruit, isPending } = useApplicationApply();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isCompleteOpen, setIsCompleteOpen] = useState(false);
    const [isAlreadyAppliedOpen, setIsAlreadyAppliedOpen] = useState(false);

    const axiosError = error instanceof AxiosError ? error : undefined;
    const isNotFound = isError && axiosError?.response?.status === 404;

    const onClickApply = () => setIsConfirmOpen(true);

    const handleConfirmApply = () => {
        if (!employmentId) return;

        applyRecruit(employmentId, {
            onSuccess: () => {
                setIsConfirmOpen(false);
                setIsCompleteOpen(true);
            },
            onError: err => {
                const axiosErr = err as AxiosError;
                setIsConfirmOpen(false);
                if (axiosErr.response?.status === 409) {
                    setIsAlreadyAppliedOpen(true);
                }
            },
        });
    };
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    const onEditClick = () => {
        navigate("/staff/user/edit-application");
    };

    if (isNotFound) {
        return (
            <>
                <Header showBackButton title="나의 지원서" />
                <Wrapper.FlexBox
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "calc(100vh - 56px)" }}
                    gap="24px"
                >
                    <Oops
                        message="작성된 지원서가 없어요"
                        description="버튼을 클릭하여 지원서를 생성하세요."
                        buttonLabel="지원서 작성하기"
                        onButtonClick={() => navigate("/staff/application/write")}
                    />
                </Wrapper.FlexBox>
            </>
        );
    }

    if (isAppLoading || isProfileLoading) return null;
    if (!application) return null;
    if (!profile) return null;
    return (
        <>
            <Header
                showBackButton
                title="나의 지원서"
                rightIconSrc={fromRecruit || fromChat ? undefined : "/icons/pencil.svg"}
                onRightClick={fromRecruit || fromChat ? undefined : onEditClick}
            />

            <Wrapper.FlexBox direction="column" margin="42px 0 0 0">
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
                                <Icon src="/icons/call.svg" alt="전화 아이콘" />
                                {formatPhoneNumberKR(profile.phone)}
                            </Text.Body2_1>

                            {application.link && application.link.trim() !== "" && (
                                <Text.Body2_1 color="Gray5">
                                    <Icon src="/icons/insta.svg" alt="인스타 아이콘" />
                                    <a href={application.link} target="_blank">
                                        {truncateText(application.link, 45)}
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
                        <Wrapper.FlexBox direction="column" margin="24px 0px" gap="12px">
                            <SectionTitle
                                title="자기소개 및 지원동기"
                                link=""
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
                    <Wrapper.FlexBox padding="10px 0px 0px 0px" justifyContent="center">
                        <Button
                            label="지원 완료 버튼"
                            width="large"
                            isActive
                            onClick={onClickApply}
                            disabled={isPending}
                        >
                            지원 완료
                        </Button>
                    </Wrapper.FlexBox>
                )}
            </Wrapper.FlexBox>

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
            {isAlreadyAppliedOpen && (
                <Modal
                    variant="default"
                    title="이미 지원 완료된 공고입니다"
                    confirmText="확인"
                    handleModalClose={() => setIsAlreadyAppliedOpen(false)}
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
