import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import SectionTitle from "@/components/SectionTitle";
import styled from "@emotion/styled";
import CategoryList from "./components/CategoryList";
import CardCarousel from "./components/CardCarousel";
import { AccompanyList } from "@/components/AccompanyList";
import Input from "@/components/Input";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useNavigate } from "react-router-dom";

const mockAccompanyData = [
    {
        id: 1,
        title: "제주 서쪽 동행 분 구해요",
        content:
            "저는 인싸는 아니지만 이야기 듣는 걸 아주 좋아하는 인프피 남성입니다 퇴사 후에 어떤걸 해야할지 모르겠어서 무작정 지원해보았는데 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구",
        timeAgo: "2시간 전",
    },
    {
        id: 2,
        title: "한라산 같이 가실 분!",
        content:
            "등산 좋아하시는 분이라면 누구든 환영입니다!등산 좋아하시는 분이라면 누구든 환영입니다등산 좋아하시는 분이라면 누구든 환영입니다등산 좋아하시는 분이라면 누구든 환영입니다",
        timeAgo: "3시간 전",
        imageUrl: "/images/guesthouse3.png",
    },
];

export default function HomePage() {
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const skipped = sessionStorage.getItem("applicationSkipped");

                const user = await fetchMinimumUserInfo();
                if (!user.onboarded && !skipped) {
                    navigate("/staff/application/write");
                }
            } catch (err) {
                console.error("사용자 정보 확인 실패", err);
            }
        };

        checkApplicationStatus();
    }, []);

    return (
        <>
            <Header title="Logo" />
            <PageWrapper hasHeader>
                <Input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="어떤 공고를 검색하시겠어요?"
                    variant="message"
                    leftIcon={<img src="/SearchIcon.svg" alt="검색" width={16} height={16} />}
                />
                <CategoryList />
                <Section>
                    <SectionTitle title="취향저격 게스트하우스 🌴" link="guesthouse/recommend" />
                    <CardCarousel />
                </Section>
                <Section>
                    <SectionTitle title="나와 취향이 맞는 동행 구하기🎒" link="accompany" />
                    <AccompanyList data={mockAccompanyData} />
                </Section>
            </PageWrapper>
        </>
    );
}

const Section = styled.section`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
