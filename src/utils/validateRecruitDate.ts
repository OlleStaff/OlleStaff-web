export const FIELDS = ["startedAt", "endedAt", "recruitmentEnd"] as const;
export type Field = (typeof FIELDS)[number];

export type RecruitDates = {
    startedAt: string;
    endedAt: string;
    recruitmentEnd: string;
};

const DATE_ERR = "올바른 날짜를 입력해 주세요.";

export const hasDigit = (s: string) => /\d/.test(s);

function parseYmd(s: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
}

//  에러 처리
export function validateRecruitDates(dates: RecruitDates) {
    const errors: Record<Field, string> = { startedAt: "", endedAt: "", recruitmentEnd: "" };

    const s = parseYmd(dates.startedAt);
    const e = parseYmd(dates.endedAt);
    const r = parseYmd(dates.recruitmentEnd);

    if (!s) errors.startedAt = DATE_ERR;
    if (!e) errors.endedAt = DATE_ERR;
    if (!r) errors.recruitmentEnd = DATE_ERR;

    if (s && e && s > e) errors.endedAt = "종료일은 시작일 이후여야 합니다.";
    if (r && s && r > s) errors.recruitmentEnd = "모집 마감일은 시작일 이전이어야 합니다.";
    if (r && e && r > e) errors.recruitmentEnd = "모집 마감일은 종료일 이전이어야 합니다.";

    const isValid = FIELDS.every(f => !errors[f]);
    return { errors, isValid };
}

// 숫자를 아직 안 친 필드는 에러 숨김
export function getVisibleDateErrors(dates: RecruitDates) {
    const { errors } = validateRecruitDates(dates);
    const visible: Record<Field, string> = { ...errors };
    for (const f of FIELDS) {
        if (!hasDigit(dates[f])) visible[f] = "";
    }
    return visible;
}
