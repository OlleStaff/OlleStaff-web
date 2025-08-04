import { BaseMessage } from "./common";

export interface TextMessage extends BaseMessage<{ text: string }> {
    messageType: "TEXT";
}

export interface PhotoMessage extends BaseMessage<{ images: string[] }> {
    messageType: "PHOTO";
}

export interface FileMessage extends BaseMessage<{ name: string; link: string }> {
    messageType: "FILE";
}

export interface ApplicantMessage
    extends BaseMessage<{
        applicantId: number;
        employmentId: number;
        title: string;
        detail: string;
    }> {
    messageType: "APPLICANT";
}

export interface AcceptedMessage
    extends BaseMessage<{
        employmentId: number;
        title: string;
        detail: string;
    }> {
    messageType: "ACCEPTED";
}

export type ChatMessage = TextMessage | PhotoMessage | FileMessage | ApplicantMessage | AcceptedMessage;
