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
                <Wrapper.FlexBox direction="column" gap="12px">
                    <Text.Body1_1>{term.title}</Text.Body1_1>
                    <Wrapper.FlexBox margin="0 0 30px 0" direction="column">
                        <MarkdownWrapper>
                            <ReactMarkdown children={term.content} remarkPlugins={[remarkGfm]} />
                        </MarkdownWrapper>
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}

const MarkdownWrapper = styled.div`
    display: inline-block;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: ${theme.color.Gray4};
    line-height: 20px;
    letter-spacing: 0.28px;

    ul,
    ol {
        margin-left: 1em;
        list-style-type: disc;
    }

    p {
        margin: 0 0 1em 0;
    }

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
