import { useGetChatRoomDetail } from "@/chat/hooks/useGetChatRoomDetail";
import ImageGrid from "@/components/ImageGrid";
import ImageViewer from "@/components/ImageViewer";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function TextMessage({ text }: { text: string }) {
    return <>{text}</>;
}

export function ImageMessage({ images }: { images: string[] }) {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleImageClick = (idx: number) => {
        setCurrentImageIndex(idx);
        setViewerOpen(true);
    };

    return (
        <>
            {images.length > 0 && <ImageGrid images={images} onImageClick={handleImageClick} />}
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

const DownloadIcon = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

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
                <Text.Body2_1 color="Gray4">{detail}</Text.Body2_1>

                <Style.ViewApplicationWrapper onClick={handleShowApplication}>
                    <img src="/icons/letter.svg" alt="지원서" />
                    <Text.Body2_1 color="White"> 지원서 보기</Text.Body2_1>
                </Style.ViewApplicationWrapper>
            </Wrapper.FlexBox>
        </>
    );
}

const Style = {
    ViewApplicationWrapper: styled.div`
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
    `,
};

export function AcceptedCard({ employmentId, title, detail }: { employmentId: number; title: string; detail: string }) {
    console.log("employmentId", employmentId);
    console.log("title", title);
    console.log("detail", detail);

    return (
        <>
            {employmentId}
            {title}
            {detail}
        </>
    );
}
