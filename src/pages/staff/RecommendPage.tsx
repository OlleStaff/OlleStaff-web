import { GuesthouseList } from "@/components/GuesthouseList";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { GuesthouseListItemProps } from "@/types/guesthouse";
import { useEffect, useState } from "react";

const mockData: GuesthouseListItemProps[] = [
    {
        employmentId: 1,
        title: "결 게스트하우스 스탭모집",
        image: "/images/guesthouse3.png",
        hashtagName: ["활기찬", "힐링", "자연", "바다"],
        content: "바다 근처 힙한 게스트 하우스",
        locationName: "함덕해수욕장",
        sex: "male",
        personNum: 2,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 2,
        title: "오션뷰 게스트하우스",
        image: "/images/guesthouse3.png",
        hashtagName: ["뷰맛집", "바다", "프라이빗"],
        content: "바다가 보이는 오션뷰 숙소",
        locationName: "협재",
        sex: "female",
        personNum: 1,
        closed: true,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 3,
        title: "소소한 쉼터",
        image: "/images/guesthouse3.png",
        hashtagName: ["힐링", "자연"],
        content: "마음이 편안해지는 조용한 숙소",
        locationName: "성산읍",
        sex: "male",
        personNum: 2,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 4,
        title: "오션뷰 게스트하우스",
        image: "/images/guesthouse3.png",
        hashtagName: ["뷰맛집", "바다", "프라이빗"],
        content: "바다가 보이는 오션뷰 숙소",
        locationName: "협재",
        sex: "female",
        personNum: 1,
        closed: true,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 5,
        title: "소소한 쉼터",
        image: "/images/guesthouse3.png",
        hashtagName: ["힐링", "자연"],
        content: "마음이 편안해지는 조용한 숙소",
        locationName: "성산읍",
        sex: "male",
        personNum: 2,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 6,
        title: "오션뷰 게스트하우스",
        image: "/images/guesthouse3.png",
        hashtagName: ["뷰맛집", "바다", "프라이빗"],
        content: "바다가 보이는 오션뷰 숙소",
        locationName: "협재",
        sex: "female",
        personNum: 1,
        closed: true,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 7,
        title: "소소한 쉼터",
        image: "/images/guesthouse3.png",
        hashtagName: ["힐링", "자연"],
        content: "마음이 편안해지는 조용한 숙소",
        locationName: "성산읍",
        sex: "male",
        personNum: 2,
        recruitmentEnd: "2025-05-13",
    },
    {
        employmentId: 8,
        title: "오션뷰 게스트하우스",
        image: "/images/guesthouse3.png",
        hashtagName: ["뷰맛집", "바다", "프라이빗"],
        content: "바다가 보이는 오션뷰 숙소",
        locationName: "협재",
        sex: "female",
        personNum: 3,
        closed: true,
        recruitmentEnd: "2025-05-13",
    },
    // api 명세에 맞게 mockdata 임시 수정
];

export default function RecommendPage() {
    const [sort, setSort] = useState<"전체" | "인기순" | "추천순">("전체");
    const [data, setData] = useState<GuesthouseListItemProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(mockData);
            } catch (error) {
                setData([]);
            }
        };

        fetchData();
    }, [sort]);
    return (
        <>
            <Header showBackButton title="취향저격 게스트 하우스" />
            <PageWrapper hasHeader>
                <TabSelector
                    labels={["전체", "인기순", "추천순"]}
                    selected={sort}
                    onChange={value => setSort(value as "전체" | "인기순" | "추천순")}
                    variant="bold"
                />
                <GuesthouseList data={data} />
            </PageWrapper>
        </>
    );
}
