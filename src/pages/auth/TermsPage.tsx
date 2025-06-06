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

export default function TermsPage() {
    const termsArray = Object.values(TERMS_CONTENT).filter(term => term.id !== "personalInfoUsageAgreement");
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
        termsArray.reduce((acc, { id }) => ({ ...acc, [id]: false }), {})
    );
    const [marketingAgreed, setMarketingAgreed] = useState(false);
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
            agreed.push("올래스텝 개인정보처리 동의서-마케팅_2025-04-09_v1");
        }

        navigate("/signup", { state: { agreements: agreed } });
    };

    const handleViewTermDetail = (id: string) => {};

    return (
        <>
            <Header showBackButton title="이용 약관 동의" />
            <PageWrapper hasHeader>
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
                    <Wrapper.FlexBox
                        alignItems="center"
                        justifyContent="space-between"
                        padding="12px 0px"
                        key={id}
                        onClick={() => handleViewTermDetail(id)}
                    >
                        <Wrapper.FlexBox gap="8px">
                            <UnderlineText>{title}</UnderlineText>
                            <Text.Body1_1 style={{ color: required ? theme.color.Main : theme.color.Gray4 }}>
                                {required ? "(필수)" : "(선택)"}
                            </Text.Body1_1>
                        </Wrapper.FlexBox>

                        <CheckImage
                            src={`/icons/${checkedItems[id] ? "checked" : "unChecked"}.svg`}
                            alt="체크박스"
                            onClick={e => {
                                e.stopPropagation();
                                handleSingleCheck(id);
                            }}
                        />
                    </Wrapper.FlexBox>
                ))}

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
            </PageWrapper>
        </>
    );
}

const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${theme.color.Gray2};
    margin: 20px 0;
`;

const UnderlineText = styled(Text.Body1_1)`
    text-decoration-line: underline;
    cursor: pointer;
`;

const CheckImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    flex-shrink: 0;
`;

const ButtonWrapper = styled.div`
    margin-top: 40px;
`;
