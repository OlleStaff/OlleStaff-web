import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { TERMS_CONTENT } from "@/constants/terms";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function OwnerTermsPage() {
    const term = TERMS_CONTENT.personalInfoUsageAgreement;

    return (
        <>
            <Header showBackButton title="이용 약관 동의" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column">
                    <Text.Body1_1>개인정보 수집 및 이용 동의</Text.Body1_1>
                    <Text.Body2_1 color="Gray4">
                        <Wrapper.FlexBox margin="0 0 30px 0" direction="column">
                            <ReactMarkdown children={term.content} remarkPlugins={[remarkGfm]} />
                        </Wrapper.FlexBox>
                    </Text.Body2_1>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
