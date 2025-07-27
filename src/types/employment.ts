// 공통 필드
interface EmploymentBase {
    instarUrl: string;
    personNum: number;
    sex: "all" | "male" | "female";
    startedAt: string;
    endedAt: string;
    recruitmentEnd: string;
    title: string;
    content: string;
    category: string;
    latitude: number;
    longitude: number;
    locationName: string;
    hashtagName: string[];
    benefitsContent: string[];
    precautions: {
        precautionsTitle: string;
        precautionsContent: string;
    }[];
}

// 게시글 작성
export interface EmploymentPostProps extends EmploymentBase {}

// 게시글 수정
export interface EmploymentPutProps extends EmploymentBase {
    employmentId: number;
    imageUrls: string[]; // 기존 이미지
    newImages: File[]; // 새로 올릴 이미지
}

// 게시글 상세 보기
export interface EmploymentGetProps extends EmploymentBase {
    employmentId: number;
    images: string[];
    phoneNum: string;
}

// 게시글 목록 조회용
export interface EmploymentPreviewProps {
    employmentId: number;
    image: string;
    hashtagName: string[];
    title: string;
    sex: "all" | "male" | "female";
    recruitmentEnd: string;
    content: string;
    locationName: string;
    personNum: number;
}

export type Mode = "create" | "edit";

export type EmploymentFormData<T extends Mode> = T extends "create" ? EmploymentPostProps : EmploymentPutProps;
