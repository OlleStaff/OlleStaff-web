import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { TERMS_CONTENT } from "@/constants/terms";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

export default function TermsDetailPage() {
    const { termId } = useParams<{ termId: string }>();
    const term = TERMS_CONTENT[termId as keyof typeof TERMS_CONTENT];

    return (
        <>
            <Header showBackButton title="이용 약관 동의" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox padding="30px" direction="column" gap="12px">
                    <Text.Body1_1>{term.title}</Text.Body1_1>
                    <Text.Body2_1 color="Gray4">
                        <Wrapper.FlexBox margin="0 0 30px 0" direction="column">
                            <MarkdownWrapper>
                                <ReactMarkdown children={term.content} remarkPlugins={[remarkGfm]} />
                            </MarkdownWrapper>
                        </Wrapper.FlexBox>
                    </Text.Body2_1>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}

const MarkdownWrapper = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
        font-size: 14px;
    }

    th,
    td {
        border: 1px solid ${theme.color.Gray2};
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: ${theme.color.Gray1};
    }
`;
