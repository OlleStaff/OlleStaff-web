import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";
import { Button } from "@/components/Button";

interface ReviewWriteCardProps {
    items: {
        id: number;
        dateRange: string;
        title: string;
    }[];
    onWriteClick?: (id: number, title: string) => void;
}

export default function ReviewWriteCard({ items, onWriteClick }: ReviewWriteCardProps) {
    return (
        <CarouselWrapper>
            <Swiper
                className="review-swiper"
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={12}
                pagination={{ clickable: true }}
            >
                {items.map(item => (
                    <SwiperSlide key={item.id}>
                        <Wrapper.FlexBox
                            direction="column"
                            padding="16px 20px"
                            border={`1px solid ${theme.color.Main}`}
                            borderRadius="12px"
                            gap="20px"
                            bgColor="white"
                        >
                            <Wrapper.FlexBox direction="column" gap="4px">
                                <Text.Body2_1 color="Gray4">{item.dateRange}</Text.Body2_1>
                                <Text.Title2_2>{item.title}</Text.Title2_2>
                            </Wrapper.FlexBox>
                            <Button
                                label="작성 버튼"
                                isActive
                                width="large"
                                onClick={() => onWriteClick?.(item.id, item.title)}
                            >
                                리뷰 작성하기
                            </Button>
                        </Wrapper.FlexBox>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CarouselWrapper>
    );
}

const CarouselWrapper = styled.div`
    .review-swiper .swiper-pagination {
        position: static !important;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;
        height: 16px;
        gap: 6px;
    }

    .review-swiper .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: ${theme.color.Gray2};
        opacity: 1;
        transition:
            width 0.2s ease,
            background-color 0.2s ease;
    }

    .review-swiper .swiper-pagination-bullet-active {
        background: ${theme.color.Gray5};
        width: 18px;
    }
`;
