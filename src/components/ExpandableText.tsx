import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";

interface ExpandableTextProps {
    text: string;
    maxWidth?: number;
}

export default function ExpandableText({ text, maxWidth = 160 }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [truncated, setTruncated] = useState(text);

    useEffect(() => {
        if (isExpanded || !text) {
            setTruncated(text);
            return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        let result = "";
        let width = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = ctx.measureText(char).width;

            if (width + charWidth > maxWidth) {
                result += "..";
                break;
            }

            result += char;
            width += charWidth;
        }

        setTruncated(result);
    }, [text, isExpanded, maxWidth]);

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <>
            <span>
                {isExpanded ? text : truncated}
                {(truncated !== text || isExpanded) && (
                    <Toggle onClick={handleToggle}>
                        <Text.Body2_1 color="Gray3">{isExpanded ? "접기" : "더보기"}</Text.Body2_1>
                    </Toggle>
                )}
            </span>
        </>
    );
}

const Toggle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding-left: 4px;
`;
