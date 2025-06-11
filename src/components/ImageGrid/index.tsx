import styled from "@emotion/styled";

interface ImageGridProps {
    images: string[];
    onImageClick?: (index: number) => void;
}

export default function ImageGrid({ images, onImageClick }: ImageGridProps) {
    const count = images.length;

    return (
        <Wrapper count={count}>
            {images.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={`image-${index}`}
                    count={count}
                    index={index}
                    onClick={() => onImageClick?.(index)}
                />
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div<{ count: number }>`
    display: grid;
    gap: 6px;
    margin-bottom: 16px;

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

const Image = styled.img<{ count: number; index: number }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;

    ${({ count, index }) => {
        if (count === 3) {
            if (index === 0) return `grid-area: main;`;
            if (index === 1) return `grid-area: rightTop;`;
            if (index === 2) return `grid-area: rightBottom;`;
        }
        return "";
    }}
`;
