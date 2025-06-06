import { useEffect, useState } from "react";

import axios from "axios";

export const usePhoneAuth = (phone: string) => {
    const [timer, setTimer] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);

    const isValidPhone = /^010\d{8}$/.test(phone);

    const requestVerification = async () => {
        if (!isValidPhone) {
            setMessage("올바른 전화번호 형식이 아닙니다.");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/phone/verification-requests`,
                {
                    phone,
                },
                { withCredentials: true }
            );

            setMessage("인증번호를 발송했습니다. 인증란에 입력해 주세요.");
            setIsStarted(true);
            setIsRequested(true);
            setIsExpired(false);
            setTimer(180);
            setIsCooldown(true);
            setTimeout(() => setIsCooldown(false), 30000); // 30초뒤 재전송 가능
        } catch (err) {
            console.error("인증 요청 실패", err);
            setMessage("인증 요청에 실패했습니다.");
        }
    };

    useEffect(() => {
        if (timer <= 0) {
            if (isStarted) setIsExpired(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return {
        timer,
        message,
        isExpired,
        isStarted,
        isRequested,
        isCooldown,
        requestVerification,
    };
};
