export const errorMessages: Record<string | number, string> = {
    // HTTP 코드
    401: "로그인이 필요합니다.",
    403: "권한이 없습니다.",
    404: "요청한 데이터를 찾을 수 없습니다.",
    409: "이미 처리된 요청입니다.",
    500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",

    // body.status
    REQUEST_VALIDATION_ERROR: "입력값이 올바르지 않습니다.",
    REQUEST_BODY_ERROR: "요청 형식이 잘못되었습니다.",
    MULTIPART_ERROR: "파일 업로드에 실패했습니다. (20MB 제한)",
    NEED_LOGIN: "로그인이 필요합니다.",
    NO_AUTHORITY: "권한이 없습니다.",
    NO_OWNERSHIP: "작성자가 아니므로 작업할 수 없습니다.",
    NOT_FOUND: "대상을 찾을 수 없습니다.",
    DUPLICATED_ERROR: "이미 처리된 요청입니다.",
    SERVER_ERROR: "서버 오류가 발생했습니다.",
};
