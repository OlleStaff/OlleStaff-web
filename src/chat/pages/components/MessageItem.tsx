import { AcceptedCard, ApplicantCard, FileMessage, ImageMessage, TextMessage } from "./MessageVariant";
import { ChatMessage, MessageType } from "@/chat/types/messages";
import MessageBubble from "./MessageBubble";
import React from "react";

type MessageOf<K extends MessageType> = Extract<ChatMessage, { messageType: K }>;

const RENDERERS = {
    TEXT: (message: MessageOf<"TEXT">) => <TextMessage text={message.content.text} />,
    IMAGE: (message: MessageOf<"IMAGE">) => <ImageMessage images={message.content.images} />,
    FILE: (message: MessageOf<"FILE">) => <FileMessage name={message.content.name} link={message.content.link} />,
    APPLICANT: (message: MessageOf<"APPLICANT">) => <ApplicantCard {...message.content} />,
    ACCEPTED: (message: MessageOf<"ACCEPTED">) => <AcceptedCard {...message.content} />,
} satisfies {
    [K in MessageType]: React.ComponentType<MessageOf<K>>;
};
type MessageItemProps = {
    message: ChatMessage;
    isMine: boolean;
};

// TEXT면 text만, IMAGE면 images만 접근하도록 컴파일 단계에서 막아주기
function renderMessage<M extends ChatMessage>(m: M) {
    const render = RENDERERS[m.messageType] as (x: M) => React.ReactNode;
    return render(m);
}

function MessageItem({ message, isMine }: MessageItemProps) {
    const isCard = message.messageType === "APPLICANT" || message.messageType === "ACCEPTED";

    return (
        <MessageBubble isMine={isMine} noBubble={isCard}>
            {renderMessage(message)}
        </MessageBubble>
    );
}

export default React.memo(MessageItem); // 같은 props가 들어왔다면 또 렌더링 하지 않도록 처리
