export function formatProfileMeta(birthDate?: string | null, gender?: string | null): string {
    if (!birthDate && !gender) return "";

    const age = birthDate ? calcInternationalAge(birthDate) : null;
    const genderShort = gender === "남자" ? "남" : gender === "여자" ? "여" : "";

    const agePart = age !== null ? `만 ${age}세` : "";
    const genderPart = genderShort ? `(${genderShort})` : "";

    if (agePart && genderPart) return `${agePart} / ${genderPart}`;
    return agePart || genderPart || "";
}

function calcInternationalAge(birthDateStr: string): number {
    const [year, month, day] = birthDateStr.split("-").map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
        age -= 1;
    }

    return Math.max(age, 0);
}
