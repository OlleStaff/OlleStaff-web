import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ChatImageGridProps {
    images: string[];
    onImageClick?: (index: number) => void;
}

export default function ChatImageGrid({ images, onImageClick }: ChatImageGridProps) {
    const count = images?.length ?? 0;
    if (count === 0) return null;

    const displayCount = Math.min(count, 4);
    const moreCount = count > 4 ? count - 4 : 0;

    return (
        <Wrapper count={count}>
            {images.slice(0, displayCount).map((src, index) => (
                <Tile
                    key={index}
                    count={displayCount}
                    index={index}
                    showMore={moreCount > 0 && index === displayCount - 1}
                    moreCount={moreCount}
                    onClick={() => onImageClick?.(index)}
                >
                    <Img src={src} alt={`image-${index}`} />
                </Tile>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div<{ count: number }>`
    display: grid;
    gap: 3px;
    width: 200px;
    height: 200px;

    ${({ count }) => {
        if (count === 1) return `grid-template-columns: 1fr;`;
        if (count === 2) return `grid-template-columns: 1fr 1fr;`;
        if (count === 3) {
            return `
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                grid-template-areas:
                    "main rightTop"
                    "main rightBottom";
            `;
        }
        if (count === 4) {
            return `
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
            `;
        }
        return `grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));`;
    }}
`;

const Img = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Tile = styled.div<{
    count: number;
    index: number;
    showMore?: boolean;
    moreCount?: number;
}>`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    ${({ count, index }) =>
        count === 3 &&
        css`
            ${index === 0 && `grid-area: main;`}
            ${index === 1 && `grid-area: rightTop;`}
      ${index === 2 && `grid-area: rightBottom;`}
        `}

    ${({ showMore, moreCount }) =>
        showMore &&
        css`
            &::after {
                content: "+${moreCount}";
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: 500;
                font-size: 18px;
                z-index: 2;
                background-color: black;
                opacity: 0.7;
            }
        `}
`;
