import { format, register } from "timeago.js";

// 한국어 locale 정의
const koLocale = (_number: number, index: number): [string, string] => {
    const table: [string, string][] = [
        ["방금 전", "곧"],
        ["%s초 전", "%s초 후"],
        ["1분 전", "1분 후"],
        ["%s분 전", "%s분 후"],
        ["1시간 전", "1시간 후"],
        ["%s시간 전", "%s시간 후"],
        ["1일 전", "1일 후"],
        ["%s일 전", "%s일 후"],
        ["1주 전", "1주 후"],
        ["%s주 전", "%s주 후"],
        ["1개월 전", "1개월 후"],
        ["%s개월 전", "%s개월 후"],
        ["1년 전", "1년 후"],
        ["%s년 전", "%s년 후"],
    ];

    return table[index];
};

register("ko", koLocale);

export const timeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffDays = (now - timestamp * 1000) / (1000 * 60 * 60 * 24);

    // 7일 이상 차이나면 YYYY.MM.DD로 표시
    if (Math.abs(diffDays) >= 7) {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    }

    return format(new Date(timestamp * 1000), "ko");
};

// D-day 일수 계산
export function calculateDDay(targetDateStr: string): string {
    const today = new Date();
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `D - ${diffDays}` : "마감됨";
}

// 20251010 입력하면 10월 10일 형태로 바뀌도록
export function formatDateToMonthDay(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 마감된 공고인지
export const isClosed = (recruitmentEnd: string): boolean => {
    const today = new Date();
    const endDate = new Date(recruitmentEnd);
    return today > endDate;
};

// 20251010 입력하면 2025-10-10 형태로 바뀌도록
export const formatDateInput = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length < 5) return digits;
    if (digits.length < 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

// YYYY-MM-DD → YYYY.MM.DD 형식으로 변환
export const toDotDate = (date: string): string => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.replace(/-/g, ".") : date;
};

export const formatTimestamp = (timestamp: number) => {
    const ms = timestamp < 1e12 ? timestamp * 1000 : timestamp; // 초 → 밀리초 보정
    const d = new Date(ms);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

export function toMs(ts: number | string | Date) {
    if (ts instanceof Date) return ts.getTime();
    const n = typeof ts === "string" ? Number(ts) : ts;
    if (!Number.isFinite(n) || n <= 0 || n >= Number.MAX_SAFE_INTEGER) return NaN;
    return n < 1e12 ? n * 1000 : n; // 초 단위면 ms로
}

export function formatChatTime(ts: number | string | Date): string {
    const ms = toMs(ts);
    if (!Number.isFinite(ms)) return "";
    const d = new Date(ms);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// 같은 날 여부 판단
export function dateKey(ts: number | string | Date): string {
    const ms = toMs(ts);
    if (!Number.isFinite(ms)) return "";
    const d = new Date(ms);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function formatDateHeader(ts: number | string | Date): string {
    const ms = toMs(ts);
    if (!Number.isFinite(ms)) return "";
    const d = new Date(ms);

    // 오늘,어제 처리 (로컬 자정 기준)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((ms - today.getTime()) / 86400000);
    const day = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

    if (diff === 0) return `오늘 (${day})`;
    if (diff === -1) return `어제 (${day})`;
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} `;
}

// 생년월일 유효성 검사
export function validateBirthDate(birth: string): string | null {
    if (!/^\d{8}$/.test(birth)) {
        return "생년월일은 8자리 숫자 (YYYYMMDD)로 입력해 주세요.";
    }

    const year = parseInt(birth.substring(0, 4), 10);
    const month = parseInt(birth.substring(4, 6), 10);
    const day = parseInt(birth.substring(6, 8), 10);

    const date = new Date(year, month - 1, day);

    // 실제 날짜가 맞는지 판별
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return "올바른 생년월일을 입력해 주세요.";
    }

    // 연도 범위 검증
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        return "올바른 연도를 입력해 주세요.";
    }

    return null;
}
