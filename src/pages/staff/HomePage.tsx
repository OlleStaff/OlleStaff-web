import { useState, useEffect, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import SectionTitle from "@/components/SectionTitle";
import styled from "@emotion/styled";
import CategoryList from "./components/CategoryList";
import CardCarousel from "./components/CardCarousel";
import { AccompanyList } from "@/components/AccompanyList";
import Input from "@/components/Input";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useNavigate } from "react-router-dom";
import { useEmploymentAll } from "@/hooks/staff/useEmploymentAll";
import Oops from "@/components/Oops";
import { GuesthouseList } from "@/components/GuesthouseList";
import { useDebounce } from "@/hooks/useDebounce";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";
import { useUserStore } from "@/store/useUserStore";
import { useShallow } from "zustand/react/shallow";
import { Wrapper } from "@/styles/Wrapper";
import { Text } from "@/styles/Text";

const mockAccompanyData = [
    {
        id: 1,
        title: "제주 서쪽 동행 분 구해요",
        content: "저는 인싸는 아니지만 이야기 듣는 걸 아주 좋아하는 인프피 남성입니다 퇴사 후에 어떤걸 해야할지...",
        createdAt: 1747837887,
        updatedAt: 1747837887,
        images: ["/images/guesthouse3.png"],
        userId: 101,
        userNickname: "훈식",
        like: false,
        likeCount: 0,
        commentCount: 0,
    },
    {
        id: 2,
        title: "한라산 같이 가실 분!",
        content: "등산 좋아하시는 분이라면 누구든 환영입니다!",
        createdAt: 1747837887,
        updatedAt: 1747837887,
        images: [],
        userId: 102,
        userNickname: "산사람",
        like: false,
        likeCount: 0,
        commentCount: 0,
    },
];

type SearchTab = StaffTabTypes["SEARCH"];

export default function HomePage() {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue.trim(), 300);
    const navigate = useNavigate();
    const [sort, setSort] = useState<SearchTab>("진행중인 공고");

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useEmploymentAll({
        type: sort === "마감공고" ? "END" : "IN_PROGRESS",
        search: debouncedSearch || undefined,
        pageSize: 6,
        enabled: !!debouncedSearch,
    });

    const setUser = useUserStore(s => s.setUser);
    const current = useUserStore(
        useShallow(s => ({
            id: s.id,
            nickname: s.nickname,
            profileImage: s.profileImage,
            type: s.type,
            gender: s.gender,
            birthDate: s.birthDate,
        }))
    );
    const bootRef = useRef(false);

    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const skipped = sessionStorage.getItem("applicationSkipped");
                const user = await fetchMinimumUserInfo();
                const same =
                    current.id === user.id &&
                    current.nickname === user.nickname &&
                    current.profileImage === user.profileImage &&
                    current.type === user.userType &&
                    current.gender === (user.gender ?? "") &&
                    current.birthDate === (user.birthDate ?? "");

                if (!bootRef.current && !same) {
                    setUser({
                        id: user.id,
                        nickname: user.nickname,
                        profileImage: user.profileImage,
                        type: user.userType,
                        gender: user.gender ?? "",
                        birthDate: user.birthDate ?? "",
                    });
                }
                bootRef.current = true;
                if (!user.onboarded && !skipped) {
                    navigate("/staff/application/write");
                }
            } catch (err) {
                console.error("사용자 정보 확인 실패", err);
            }
        };

        checkApplicationStatus();
    }, []);

    useEffect(() => {
        if (!debouncedSearch) {
            setSort("진행중인 공고");
        }
    }, [debouncedSearch]);

    const isDebouncing = searchValue !== debouncedSearch;
    const searchResults = data?.pages ? data.pages.flatMap(page => page.items) : [];

    return (
        <>
            <PageWrapper>
                <Input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="어떤 공고를 검색하시겠어요?"
                    variant="message"
                    leftIcon={<img src="/icons/searchIcon.svg" alt="검색" width={16} height={16} />}
                />

                {searchValue ? (
                    <Section>
                        {isDebouncing || isLoading ? (
                            <SkeletonList variant="guesthouse" count={5} />
                        ) : isError ? (
                            <Oops message="에러가 발생했어요" description="다시 시도해주세요" />
                        ) : searchResults.length === 0 ? (
                            <>
                                <Wrapper.FlexBox
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap="12px"
                                    margin="20px 0"
                                    style={{ flex: 1 }}
                                >
                                    <img
                                        src="/icons/searchIcon.svg"
                                        alt="oops"
                                        style={{ width: "55px", padding: "10px" }}
                                    />
                                    <Wrapper.FlexBox gap="8px" direction="column" alignItems="center">
                                        <Text.Body1_1 color="Gray3">
                                            '{searchValue}'에 대한 검색 결과가 없어요.
                                        </Text.Body1_1>
                                        <Text.Body2_1
                                            color="Gray3"
                                            style={{ whiteSpace: "pre-line", textAlign: "center" }}
                                        >
                                            새로운 검색어로 다시 시도해보세요.
                                        </Text.Body2_1>
                                    </Wrapper.FlexBox>
                                </Wrapper.FlexBox>
                            </>
                        ) : (
                            <>
                                <TabSelector
                                    labels={[...TAB_LABELS.STAFF.SEARCH]}
                                    selected={sort}
                                    onChange={value => setSort(value as SearchTab)}
                                    variant="bold"
                                ></TabSelector>
                                <GuesthouseList
                                    data={searchResults}
                                    fetchNextPage={fetchNextPage}
                                    hasNextPage={hasNextPage}
                                    isFetchingNextPage={isFetchingNextPage}
                                />
                            </>
                        )}
                    </Section>
                ) : (
                    <>
                        <CategoryList />
                        <Section>
                            <SectionTitle title="취향저격 게스트하우스 🌴" link="" />
                            <CardCarousel />
                        </Section>
                        <Section>
                            <SectionTitle title="나와 취향이 맞는 동행 구하기🎒" link="accompany" />
                            <AccompanyList data={mockAccompanyData} />
                        </Section>
                    </>
                )}
            </PageWrapper>
        </>
    );
}

const Section = styled.section`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
`;
