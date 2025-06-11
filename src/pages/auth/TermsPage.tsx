import { useState } from "react";
import styled from "@emotion/styled";
import { TERMS_CONTENT } from "@/constants/terms";
import theme from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Wrapper } from "@/styles/Wrapper";
import AgreementCheck from "./components/AgreementCheck";

export default function TermsPage() {
    const termsArray = Object.values(TERMS_CONTENT).filter(term => term.id !== "personalInfoUsageAgreement");
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
        termsArray.reduce((acc, { id }) => ({ ...acc, [id]: false }), {})
    );
    const [marketingAgreed, _] = useState(false);
    const navigate = useNavigate();

    const allChecked = termsArray.every(term => checkedItems[term.id]);
    const allRequiredChecked = termsArray.filter(term => term.required).every(term => checkedItems[term.id]);

    const handleSingleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAllCheck = () => {
        const next = !allChecked;
        const newState = termsArray.reduce((acc, term) => ({ ...acc, [term.id]: next }), {} as Record<string, boolean>);
        setCheckedItems(newState);
    };

    const handleSubmit = () => {
        const agreed = termsArray
            .filter(term => checkedItems[term.id])
            .map(term => `${term.title}_${term.date}_${term.version}`);

        if (marketingAgreed) {
            const marketingTerm = TERMS_CONTENT.personalInfoUsageAgreement;
            agreed.push(`${marketingTerm.title}_${marketingTerm.date}_${marketingTerm.version}`);
        }

        navigate("/signup", { state: { agreements: agreed } });
    };

    return (
        <>
            <Header showBackButton title="이용 약관 동의" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox
                    direction="column"
                    justifyContent="space-between"
                    height={`calc(100vh - ${theme.size.HeaderHeight})`}
                >
                    <div>
                        <Wrapper.FlexBox justifyContent="space-between">
                            <Text.Title3_1>전체 동의 합니다.</Text.Title3_1>
                            <CheckImage
                                src={`/icons/${allChecked ? "checked" : "unChecked"}.svg`}
                                alt="전체 동의 체크박스"
                                onClick={handleAllCheck}
                            />
                        </Wrapper.FlexBox>
                        <Divider />

                        {termsArray.map(({ id, title, required }) => (
                            <AgreementCheck
                                key={id}
                                isChecked={checkedItems[id]}
                                onToggle={() => handleSingleCheck(id)}
                                label={title}
                                requirementType={required ? "필수" : "선택"}
                                termsLink={`/terms/${id}`}
                            />
                        ))}
                    </div>

                    <ButtonWrapper>
                        <Button
                            label=""
                            width="large"
                            backgroundColor="Main"
                            disabled={!allRequiredChecked}
                            isActive={allRequiredChecked}
                            onClick={handleSubmit}
                        >
                            동의 완료
                        </Button>
                    </ButtonWrapper>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}

const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${theme.color.Gray2};
    margin: 20px 0;
`;

const CheckImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    flex-shrink: 0;
`;

const ButtonWrapper = styled.div`
    padding-bottom: 40px;
`;
