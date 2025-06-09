import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "@emotion/styled";

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    return (
        <CarouselWrapper>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    type: "fraction",
                    el: ".custom-pagination",
                }}
                spaceBetween={10}
                slidesPerView={1}
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <SlideImage src={img} alt={`image-${idx}`} />
                        <CustomPagination>
                            {idx + 1} / {images.length}
                        </CustomPagination>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CarouselWrapper>
    );
}

const CarouselWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;

    .swiper-button-prev,
    .swiper-button-next {
        color: white;
        &::after {
            font-size: 24px;
            font-weight: bold;
        }
    }
`;

const SlideImage = styled.img`
    width: 100%;
    height: 242px;
    object-fit: cover;
    border-radius: 12px;
`;

const CustomPagination = styled.div`
    position: absolute;
    right: 12px;
    bottom: 16px;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
    backdrop-filter: blur(10px);
`;
