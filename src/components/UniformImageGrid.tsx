import styled from "@emotion/styled";

interface UniformImageGridProps {
    images: string[];
    onImageClick?: (index: number) => void;
}

export default function UniformImageGrid({ images, onImageClick }: UniformImageGridProps) {
    return (
        <Grid>
            {images.map((src, index) => (
                <ImageWrapper key={index} onClick={() => onImageClick?.(index)}>
                    <img src={src} alt={`image-${index}`} />
                </ImageWrapper>
            ))}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 8px;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
