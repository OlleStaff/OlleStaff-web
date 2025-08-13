import { useState } from "react";
import styled from "@emotion/styled";

type StarProps = {
    totalStars?: number;
    rating?: number;
    onChange?: (rating: number) => void;
};

export default function Star({ totalStars = 5, rating: initialRating = 0, onChange }: StarProps) {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - left;
        const clickedValue = clickX < width / 2 ? 0.5 : 1;
        const newRating = index + clickedValue;
        setRating(newRating);
        onChange?.(newRating);
    };
    return (
        <>
            <StarWrapper>
                {[...Array(totalStars)].map((_, i) => {
                    const diff = rating - i;
                    return (
                        <StarContainer key={i} onClick={e => handleClick(i, e)}>
                            {diff >= 1 && <StarFull />}
                            {diff > 0 && diff < 1 && <StarHalf />}
                            {diff <= 0 && <StarEmpty />}
                        </StarContainer>
                    );
                })}
            </StarWrapper>
        </>
    );
}

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const StarContainer = styled.div`
    position: relative;
    width: 26px;
    height: 26px;
    margin-right: 16px;
`;

const StarFull = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("/icons/fullStar.svg") no-repeat center/contain;
`;

const StarHalf = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("/icons/halfStar.svg") no-repeat center/contain; // 변경할 이미지
    overflow: hidden;
`;

const StarEmpty = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("/icons/emptyStar.svg") no-repeat center/contain;
`;
