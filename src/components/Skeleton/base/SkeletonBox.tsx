import styled from "@emotion/styled";
import { shimmer } from "../SkeletonStyle";

export const SkeletonBox = styled.div<{
    width?: string;
    height?: string;
    borderRadius?: string;
}>(({ width = "100%", height = "16px", borderRadius = "4px" }) => ({
    width,
    height,
    borderRadius,
    backgroundColor: "#f2f2f2",
    backgroundImage: "linear-gradient(90deg, #f2f2f2 0%, #e6e6e6 50%, #f2f2f2 100%)",
    backgroundSize: "200% 100%",
    backgroundRepeat: "no-repeat",
    animation: `${shimmer} 1.4s ease-in-out infinite`,
    willChange: "background-position",
}));
