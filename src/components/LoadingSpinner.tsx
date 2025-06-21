import styled from "@emotion/styled";
import PageWrapper from "./PageWrapper";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

export default function LoadingSpinner() {
    return (
        <PageWrapper>
            <Wrapper.FlexBox justifyContent="center" alignItems="center" height="100%">
                <IOSSpinner>
                    {[...Array(9)].map((_, i) => (
                        <div key={i} />
                    ))}
                </IOSSpinner>
            </Wrapper.FlexBox>
        </PageWrapper>
    );
}

const IOSSpinner = styled.div`
    width: 40px;
    height: 40px;
    position: relative;

    div {
        transform-origin: 20px 20px;
        animation: none;
    }

    div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 2px;
        left: 18px;
        width: 2.5px;
        height: 10px;
        border-radius: 20%;
        animation: spinner-fade-color 1s linear infinite;
    }

    ${[...Array(9)]
        .map(
            (_, i) => `
        div:nth-of-type(${i + 1}) {
            transform: rotate(${i * 40}deg);
        }

        div:nth-of-type(${i + 1}):after {
            animation-delay: -${(8 - i) * 0.1}s;
        }
    `
        )
        .join("")}

    @keyframes spinner-fade-color {
        0% {
            background: ${theme.color.Main};
            opacity: 1;
        }
        33% {
            background: ${theme.color.Sub1};
            opacity: 1;
        }
        66% {
            background: ${theme.color.Sub2};
            opacity: 1;
        }
        100% {
            background: transparent;
            opacity: 0.2;
        }
    }
`;
