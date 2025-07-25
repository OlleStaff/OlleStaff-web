import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface SectionTitleProps {
    title: string;
    link?: string;
    type?: "default" | "copy";
    onCopyClick?: () => void;
}
export default function SectionTitle({ title, link, type = "default", onCopyClick }: SectionTitleProps) {
    const navigate = useNavigate();

    if (type === "copy") {
        return (
            <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
                <Text.Body1_2>{title}</Text.Body1_2>
                <CopyButton onClick={onCopyClick}>
                    <img src="/icons/copy.svg" alt="복사 아이콘" />
                </CopyButton>
            </Wrapper.FlexBox>
        );
    }

    return (
        <Wrapper.FlexBox justifyContent="space-between" alignItems="center">
            <Text.Title2_2>{title}</Text.Title2_2>

            {link && (
                <MoreButton onClick={() => navigate(link, { relative: "path" })}>
                    <Text.Body3_1 color="Gray4" style={{ marginTop: "2px" }}>
                        더보기
                    </Text.Body3_1>
                    <img style={{ width: "17px", height: "17px" }} src="/icons/backbtn.svg" alt="더보기 아이콘" />
                </MoreButton>
            )}
        </Wrapper.FlexBox>
    );
}

const MoreButton = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const CopyButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
        padding: 3px;
    }
`;
