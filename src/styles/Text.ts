import styled from "@emotion/styled";
import theme from "./theme";
import { css, Theme } from "@emotion/react";

// 재사용 될 텍스트
type StyleText = {
    color?: keyof Theme["color"];
    pointer?: boolean;
    margin?: string;
};

const baseTextStyle = css`
    display: inline-block;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
`;

export const Text = {
    Title1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 24px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 31px;
        letter-spacing: 0.48px;
    `,
    Title1_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 24px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 31px;
        letter-spacing: 0.48px;
    `,
    Title2: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 20px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 26px;
        letter-spacing: 0.4px;
    `,
    Title2_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 20px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 26px;
        letter-spacing: 0.4px;
    `,
    Title2_2: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 600;
        font-size: 20px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 26px;
        letter-spacing: 0.4px;
    `,
    Title3: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 18px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 23px;
        letter-spacing: 0.36px;
    `,
    Title3_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 18px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 23px;
        letter-spacing: 0.36px;
    `,
 
    Title3_2: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 600;
        font-size: 18px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 23px;
        letter-spacing: 0.36px;
    `,
    Title4: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 600;
        font-size: 16px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.32px;
 
    `,
    Body1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 16px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.32px;
    `,
    Body1_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 16px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.32px;
    `,
    Body1_2: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 600;
        font-size: 16px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.32px;
    `,
    Body2: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 14px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.28px;
    `,
    Body2_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 14px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.28px;
    `,
    Body3: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 400;
        font-size: 12px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.24px;
    `,
    Body3_1: styled.span<StyleText>`
        ${baseTextStyle};
        font-weight: 500;
        font-size: 12px;
        color: ${({ color }) => (color ? theme.color[color] : theme.color.Black)};
        cursor: ${props => props.pointer && "pointer"};
        line-height: 20px;
        letter-spacing: 0.24px;
    `,
};
