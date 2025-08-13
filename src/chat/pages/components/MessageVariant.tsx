import { useGetChatRoomDetail } from "@/chat/hooks/useGetChatRoomDetail";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

export function TextMessage({ text }: { text: string }) {
    return <>{text}</>;
}

export function ImageMessage({ images }: { images: string[] }) {
    console.log("이미지 배열", images);
    return <>{images}</>;
}

export function FileMessage({ name, link }: { name: string; link: string }) {
    console.log("name", name);
    console.log("link", link);

    return (
        <>
            {name}
            {link}
        </>
    );
}

export function ApplicantCard({
    title,
    detail,
}: {
    applicantId: number;
    employmentId: number;
    title: string;
    detail: string;
}) {
    const { chatRoomId } = useParams();
    const { data: chatroom } = useGetChatRoomDetail(Number(chatRoomId));

    const navigate = useNavigate();

    const handleShowApplication = () => {
        if (!chatroom?.userId) return;

        navigate(`/user/application/${chatroom.userId}`, { state: { fromChat: true } });
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
