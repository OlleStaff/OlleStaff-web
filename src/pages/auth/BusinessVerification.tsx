import { Button } from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PageWrapper from "@/components/PageWrapper";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useState } from "react";
import BusinessFileUploader from "./components/BusinessFileUploader";
import AgreementCheck from "./components/AgreementCheck";
import useBusinessVerification from "@/hooks/auth/useBusinessVerification";
import { useBusinessVerificationSubmit } from "@/hooks/auth/useBusinessVerificationSubmit";
import theme from "@/styles/theme";
import { useNavigate } from "react-router-dom";

export default function BusinessVerificationPage() {
    const { businessName, setBusinessName, selectedFile, setSelectedFile, isAgreed, setIsAgreed, clearDraft } =
        useBusinessVerification();

    const [isComplete, setIsComplete] = useState(false);
    const { mutate: submitVerification } = useBusinessVerificationSubmit();

    const navigate = useNavigate();
    const handleSubmitForm = () => {
        if (!businessName || !selectedFile || !isAgreed) return;

        const today = new Date().toISOString().split("T")[0];
        const agreement = `올레스텝 개인정보 수집 및 이용 동의_사업자 인증_${today}_v1`;

        submitVerification(
            {
                businessName,
                businessRegistrationCertificate: selectedFile,
                agreement,
            },
            {
                onSuccess: () => {
                    alert("사업자 인증이 완료되었습니다.");
                    navigate("/owner");
                    clearDraft();
                },
                onError: () => {
                    alert("사업자 인증 중 오류가 발생했습니다.");
                },
            }
        );
    };

    useEffect(() => {
        setIsComplete(businessName !== "" && selectedFile !== null && isAgreed);
    }, [businessName, selectedFile, isAgreed]);

    return (
        <>
            <Header showBackButton title="사업자 인증" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox
                    height={`calc(100% - ${theme.size.HeaderHeight})`}
                    direction="column"
                    justifyContent="space-between"
                    padding="30px"
                >
                    <Wrapper.FlexBox height="auto" direction="column" gap="20px">
                        <Input
                            inputTitle="사업자명"
                            onChange={e => setBusinessName(e.target.value)}
                            placeholder="사업자명을 입력하세요."
                            value={businessName}
                            variant="default"
                        />
                        <BusinessFileUploader selectedFile={selectedFile} onFileChange={setSelectedFile} />
                    </Wrapper.FlexBox>

                    <Wrapper.FlexBox height="auto" direction="column">
                        <AgreementCheck
                            isChecked={isAgreed}
                            onToggle={() => setIsAgreed(!isAgreed)}
                            label="개인정보 수집 및 이용 동의"
                            requirementType="필수"
                            termsLink="/business-verification/term"
                        />

                        <Button
                            label="인증 완료 버튼"
                            width="large"
                            height="large"
                            onClick={handleSubmitForm}
                            isActive={isComplete}
                        >
                            인증 완료
                        </Button>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
