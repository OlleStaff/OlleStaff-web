import styled from "@emotion/styled";
import PageWrapper from "./PageWrapper";
import { Wrapper } from "@/styles/Wrapper";

export default function LoadingSpinner() {
    return (
        <PageWrapper>
            <Wrapper.FlexBox justifyContent="center" alignItems="center" height="100%">
                <IOSSpinner>
                    {[...Array(10)].map((_, i) => (
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
        animation: spinner-fade 1s linear infinite;
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
        background: #333;
    }

    ${[...Array(10)]
        .map(
            (_, i) => `
        div:nth-of-type(${i + 1}) {
            transform: rotate(${i * 36}deg);
            animation-delay: -${(9 - i) * 0.1}s;
        }
    `
        )
        .join("")}

    @keyframes spinner-fade {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
