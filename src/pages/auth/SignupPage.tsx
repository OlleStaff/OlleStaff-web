import Input from "@/components/Input";
import ProfileAdd from "@/components/ProfileAdd";
import { Wrapper } from "@/styles/Wrapper";
import { Button } from "@/components/Button";
import useValidation from "@/hooks/useValidation";
import { VerificationTimer } from "@/components/VerificationTimer";
import { usePhoneAuth } from "@/hooks/auth/usePhoneAuth";
import { useEffect, useState } from "react";
import { useSignup } from "@/hooks/auth/useSignup";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import styled from "@emotion/styled";

export default function SignupPage() {
    const { userInfo, errors, handleInputChange, validate } = useValidation();
    const {
        timer,
        message: verificationMessage,
        isExpired,
        isStarted,
        isCooldown,
        isRequested,
        requestVerification,
    } = usePhoneAuth(userInfo.phone);

    const isAllFilled =
        !!userInfo.nickname.trim() &&
        !!userInfo.birthDate.trim() &&
        !!userInfo.phone.trim() &&
        !!userInfo.verificationCode.trim() &&
        isRequested &&
        !isExpired;

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const location = useLocation();
    const passedAgreements: string[] = location.state?.agreements ?? [];
    const navigate = useNavigate();

    const signupMutation = useSignup();

    const handleSubmit = () => {
        if (!validate()) return;

        signupMutation.mutate({
            nickname: userInfo.nickname,
            phone: userInfo.phone,
            phoneVerificationCode: userInfo.verificationCode,
            birthDate: parseInt(userInfo.birthDate),
            image: selectedImage,
            agreements: passedAgreements,
        });
    };

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        const matched = digits.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
        return matched ? [matched[1], matched[2], matched[3]].filter(Boolean).join("-") : digits;
    };

    useEffect(() => {
        sessionStorage.removeItem("kakao_login_sent");
    }, []);

    return (
        <>
            <Header showBackButton title="회원가입" onBackClick={() => navigate("/")} />
            <PageWrapper hasHeader>
                <div>
                    <Wrapper.FlexBox justifyContent="center">
                        <ProfileAdd onImageChange={setSelectedImage} />
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox direction="column" gap="6px">
                        <Input
                            inputTitle="닉네임"
                            value={userInfo.nickname}
                            onChange={handleInputChange("nickname")}
                            placeholder="닉네임을 입력하세요."
                            bottomMessage={errors.nickname}
                            required
                        />

                        <Input
                            inputTitle="생년월일"
                            value={userInfo.birthDate}
                            onChange={handleInputChange("birthDate")}
                            placeholder="YYYYMMDD를 입력하세요."
                            bottomMessage={errors.birthDate}
                            required
                        />

                        <Wrapper.FlexBox gap="4px" alignItems="center">
                            <Input
                                inputTitle="전화번호"
                                value={formatPhoneNumber(userInfo.phone)}
                                onChange={e => {
                                    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 11);
                                    const formattedEvent = {
                                        ...e,
                                        target: {
                                            ...e.target,
                                            value: onlyDigits,
                                        },
                                    };
                                    handleInputChange("phone")(formattedEvent as React.ChangeEvent<HTMLInputElement>);
                                }}
                                placeholder="전화번호를 입력하세요."
                                bottomMessage={errors.phone || verificationMessage}
                                messageColor={errors.phone ? "Red1" : "Gray4"}
                                required
                            />
                            <Button
                                width="small"
                                height="small"
                                label="인증 요청 버튼"
                                onClick={requestVerification}
                                disabled={isCooldown || !/^010\d{8}$/.test(userInfo.phone)}
                                isActive={!isCooldown && /^010\d{8}$/.test(userInfo.phone)}
                            >
                                {isRequested ? "재전송" : "인증 요청"}
                            </Button>
                        </Wrapper.FlexBox>

                        <Input
                            inputTitle="전화번호 인증"
                            value={userInfo.verificationCode}
                            onChange={handleInputChange("verificationCode")}
                            placeholder="인증번호를 입력하세요."
                            rightIcon={<VerificationTimer timer={timer} />}
                            bottomMessage={
                                isStarted && isExpired
                                    ? "제한시간을 초과하여 인증에 실패하였습니다.\n‘재전송’ 버튼을 눌러 새로운 인증번호를 받아주세요."
                                    : errors.verificationCode
                            }
                            required
                        />
                    </Wrapper.FlexBox>

                    <ButtonWrapper>
                        <Button
                            label="가입 완료 버튼"
                            width="large"
                            onClick={handleSubmit}
                            disabled={!isAllFilled}
                            isActive={isAllFilled}
                        >
                            가입 완료
                        </Button>
                    </ButtonWrapper>
                </div>
            </PageWrapper>
        </>
    );
}

const ButtonWrapper = styled.div`
    margin-top: 40px;
`;
