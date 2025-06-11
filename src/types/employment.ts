// 공고 게시글 작성
export interface EmploymentPostProps {
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

// 공고 상세 보기
export interface EmploymentGetProps {
    employmentId: number;
    images: string[];
    hashtagName: string[];
    title: string;
    instarUrl: string;
    personNum: number;
    sex: "all" | "male" | "female";
    endedAt: string;
    startedAt: string;
    recruitmentEnd: string;
    content: string;
    latitude: number;
    longitude: number;
    benefitsContent: string[];
    phoneNum: string;
    locationName: string;
}

// 공고 게시글 수정
export interface EmploymentPutProps {
    employmentId: number;
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
    images: string[];
}

// 공고 목록 조회용 (리스트, /employments/all)
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
