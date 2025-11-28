import { useState, useEffect, useRef } from "react";
import SectionTitle from "@/components/SectionTitle";
import styled from "@emotion/styled";
import CategoryList from "./components/CategoryList";
import CardCarousel from "./components/CardCarousel";
import Input from "@/components/Input";
import { fetchMinimumUserInfo } from "@/hooks/user/useFetchMinumumUserInfo";
import { useNavigate } from "react-router-dom";
import { useEmploymentAll, useEmploymentLatest } from "@/hooks/staff/useEmploymentAll";
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

type SearchTab = StaffTabTypes["SEARCH"];

export default function HomePage() {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue.trim(), 300);
    const navigate = useNavigate();
    const [sort, setSort] = useState<SearchTab>("진행중인 공고");

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEmploymentAll({
        type: sort === "마감공고" ? "END" : "IN_PROGRESS",
        search: debouncedSearch || undefined,
        pageSize: 6,
        enabled: !!debouncedSearch,
    });
    const { data: latest, isLoading: isLatestLoading } = useEmploymentLatest(10);

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
                // showToast("다시 로그인해주세요."),
                navigate("/");
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
                                    <Text.Body2_1 color="Gray3" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
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
                        <SectionTitle title="취향저격 게스트하우스 🌴" />
                        <CardCarousel />
                    </Section>
                    <Section>
                        <SectionTitle title="새롭게 올라온 게스트하우스 🏡" link="/staff/guesthouse/latest" />
                        {isLatestLoading ? (
                            <SkeletonList variant="guesthouse" count={2} />
                        ) : !latest || latest.length === 0 ? (
                            <Oops message="작성된 공고가 없어요" description="공고가 올라올 때까지 기다려주세요!" />
                        ) : (
                            <GuesthouseList
                                data={latest.slice(0, 2)}
                                fetchNextPage={undefined}
                                hasNextPage={false}
                                isFetchingNextPage={false}
                            />
                        )}
                    </Section>
                </>
            )}
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
