import { useState } from "react";
import { UserInfo, ErrorState } from "@/types/user";

export default function useValidation() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        nickname: "",
        phone: "",
        verificationCode: "",
        birthDate: "",
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const [verificationMessage, setVerificationMessage] = useState("");

    const handleInputChange = (field: keyof UserInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: e.target.value,
        }));

        setErrors(prev => ({
            ...prev,
            [field]: "",
        }));
    };

    const validate = (options?: { skipBirthDateCheck?: boolean; originalPhone?: string }) => {
        const newErrors: ErrorState = {};

        if (userInfo.nickname.length < 2 || userInfo.nickname.length > 8) {
            newErrors.nickname = "닉네임은 2~8자 사이여야 해요.";
        }

        if (!/^010\d{8}$/.test(userInfo.phone)) {
            newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
        }

        // 전화번호가 바뀐 경우에만 인증번호 체크
        if (userInfo.phone !== options?.originalPhone) {
            if (userInfo.verificationCode !== "000000") {
                newErrors.verificationCode = "인증번호가 틀렸습니다.";
            }
        }

        if (!options?.skipBirthDateCheck && !/^\d{8}$/.test(userInfo.birthDate)) {
            newErrors.birthDate = "생년월일은 8자리 숫자 (YYYYMMDD)로 입력해 주세요.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const phoneBottomMessage = errors.phone || verificationMessage;
    const phoneMessageColor = errors.phone ? "Red1" : "Gray4";

    return {
        userInfo,
        setUserInfo,
        errors,
        handleInputChange,
        validate,
        setVerificationMessage,
        phoneBottomMessage,
        phoneMessageColor,
    };
}
