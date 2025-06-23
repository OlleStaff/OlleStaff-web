import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
`;
