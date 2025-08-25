import { useGetChatRoomDetail } from "@/chat/hooks/useGetChatRoomDetail";
import ImageViewer from "@/components/ImageViewer";
import Modal from "@/components/Modal";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatImageGrid from "./ChatImageGrid";

export function TextMessage({ text }: { text: string }) {
    return <>{text}</>;
}

export function ImageMessage({ images }: { images: string[] }) {
    const list = (images ?? []).filter(Boolean);
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };
    if (list.length === 0) return null;

    return (
        <>
            {images.length > 0 && <ChatImageGrid images={images} onImageClick={handleImageClick} />}
            {isViewerOpen && (
                <ImageViewer images={images} startIndex={currentImageIndex} onClose={() => setViewerOpen(false)} />
            )}
        </>
    );
}

export function FileMessage({ name, link }: { name: string; link: string }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" title={name}>
            {name} <DownloadIcon src="/icons/download.svg" alt="다운로드" />
        </a>
    );
}

export function ApplicantCard({ title, detail }: { title: string; detail: string }) {
    const { chatRoomId } = useParams();
    const { data: chatroom } = useGetChatRoomDetail(Number(chatRoomId));

    const navigate = useNavigate();
    const userType = useUserStore(u => u.type);

    const handleShowApplication = () => {
        if (!chatroom?.userId) return;

        if (userType === "GUESTHOUSE") {
            navigate(`/user/application/${chatroom.userId}`, { state: { fromChat: true } });
        } else {
            navigate(`/user/application`, { state: { fromChat: true } });
        }
    };

    return (
        <>
            <Wrapper.FlexBox direction="column">
                <Text.Title4>{title} </Text.Title4>
                <Wrapper.FlexBox direction="column" margin="6px 0 0 0">
                    <Text.Body2_1 color="Gray4">{detail}</Text.Body2_1>
                </Wrapper.FlexBox>
                <ViewApplicationWrapper onClick={handleShowApplication}>
                    <img src="/icons/letter.svg" alt="지원서" />
                    <Text.Body2_1 color="White"> 지원서 보기</Text.Body2_1>
                </ViewApplicationWrapper>
            </Wrapper.FlexBox>
        </>
    );
}

export function AcceptedCard({ employmentId, title, detail }: { employmentId: number; title: string; detail: string }) {
    const { data: employment } = useGetEmploymentDetail(employmentId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowPrecautions = () => {
        setIsModalOpen(true);
    };

    const handleClosePrecautions = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Wrapper.FlexBox direction="column">
                <Text.Title4> {title} </Text.Title4>

                <Wrapper.FlexBox direction="column" margin="6px 0 0 0">
                    <Text.Body2_1 color="Gray4">{detail}</Text.Body2_1>
                </Wrapper.FlexBox>

                <ViewPrecautionsWrapper onClick={handleShowPrecautions}>
                    <img src="/icons/precautions.svg" alt="지원서" />
                    <Text.Body2_1 color="Main"> 주의사항 보기</Text.Body2_1>
                </ViewPrecautionsWrapper>

                {isModalOpen && (
                    <>
                        <Modal variant="page" handleModalClose={handleClosePrecautions}>
                            <Wrapper.FlexBox justifyContent="space-between">
                                <Wrapper.FlexBox gap="10px">
                                    <img src="/icons/smile.svg" alt="주의사항" />
                                    <Text.Title3_2>주의사항</Text.Title3_2>
                                </Wrapper.FlexBox>
                                <img
                                    src="/icons/xButton.svg"
                                    alt="닫기"
                                    onClick={handleClosePrecautions}
                                    style={{ cursor: "pointer" }}
                                />
                            </Wrapper.FlexBox>

                            <Wrapper.FlexBox direction="column">
                                <ScrollableArea>
                                    {employment?.data.precautions.map((item, idx) => {
                                        return (
                                            <>
                                                <PrecautionItem key={`${item.precautionsTitle}-${idx}`}>
                                                    <Text.Body1_1>{item.precautionsTitle}</Text.Body1_1>
                                                    <Text.Body2_1 color="Gray4">{item.precautionsTitle}</Text.Body2_1>
                                                </PrecautionItem>
                                            </>
                                        );
                                    })}
                                </ScrollableArea>
                            </Wrapper.FlexBox>
                        </Modal>
                    </>
                )}
            </Wrapper.FlexBox>
        </>
    );
}

const DownloadIcon = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

const ViewApplicationWrapper = styled.div`
    background-color: #02ccda;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    cursor: pointer;
`;

const ViewPrecautionsWrapper = styled.div`
    background-color: #f2feff;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    cursor: pointer;
`;

const PrecautionItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 0;
    border-bottom: 1px solid ${theme.color.Gray1};
    &:last-child {
        border-bottom: none;
    }
`;

const ScrollableArea = styled.div`
    max-height: 328px;
    overflow-y: auto;
    scrollbar-width: none;
`;
