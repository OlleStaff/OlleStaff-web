export function formatPhoneNumberKR(input: string | number): string {
    const d = String(input).replace(/\D/g, "");
    if (!d) return "";

    // 02 지역번호 (서울)
    if (d.startsWith("02")) {
        if (d.length <= 2) return d;
        if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
        const midEnd = d.length - 4; // 최소 구분
        return `${d.slice(0, 2)}-${d.slice(2, midEnd)}-${d.slice(midEnd, 11)}`;
    }

    // 휴대폰 010
    if (d.startsWith("010")) {
        const s = d.slice(0, 11);
        if (s.length <= 3) return s; // "010"
        if (s.length <= 7) return `${s.slice(0, 3)}-${s.slice(3)}`; // "010-1234"
        return `${s.slice(0, 3)}-${s.slice(3, 7)}-${s.slice(7)}`; // "010-1234-5678"
    }

    // 그 외 (예: 031, 051 등)
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
    // 10자리는 3-3-4, 11자리는 3-4-4
    const isTen = d.length === 10;
    const midEnd = isTen ? 6 : 7;

    return `${d.slice(0, 3)}-${d.slice(3, midEnd)}-${d.slice(midEnd, 11)}`;
}
