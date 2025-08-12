import Header from "@/components/Header";
import Oops from "@/components/Oops";
import TabSelector from "@/components/TabSelector";
import { OwnerTabTypes, TAB_LABELS } from "@/constants/tabs";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { GuesthouseListItem } from "@/components/GuesthouseList/GuesthouseListItem";
import { useDeleteEmployment } from "@/hooks/owner/employment/useDeleteEmployment";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import { useGetMyEmploymentList } from "@/hooks/owner/employment";
import { SkeletonList } from "@/components/Skeleton/SkeletonList";

type ModalType = "confirm" | "success" | null;

export default function RecruitListPage() {
    const [sort, setSort] = useState<OwnerTabTypes["MY_RECRUIT"]>("전체");
    const [isEditTextClicked, setIsEditTextClicked] = useState(false);

    const { data, isLoading } = useGetMyEmploymentList();

    const filteredRecruits = useMemo(() => {
        if (!data) return [];
        if (sort === "전체") return data;
        if (sort === "진행중인 공고") return data.filter(item => !item.closed);
        if (sort === "마감공고") return data.filter(item => item.closed);
        return data;
    }, [sort, data]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const toggleEditMode = () => {
        setIsEditTextClicked(prev => !prev);
        setCheckedIds([]);
    };

    const handleToggleCheck = (id: number) => {
        setCheckedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    };

    const isDeletable = checkedIds.length > 0;
    const { mutate: deleteEmployments } = useDeleteEmployment();

    const navigate = useNavigate();
    const handleDeleteRecruitItem = () => {
        deleteEmployments(checkedIds, {
            onSuccess: () => {
                openModal("success");
                setIsEditTextClicked(false);
                navigate("/owner/recruitments-ongoing");
            },
            onError: error => {
                console.error("삭제 실패", error);
                alert("삭제 중 오류가 발생했습니다.");
            },
        });
    };

    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: ModalType) => setModalType(type);
    const closeModal = () => setModalType(null);

    useEffect(() => {
        setCheckedIds([]);
    }, [sort]);

    return (
        <>
            {modalType === "confirm" && (
                <Modal
                    variant="confirm"
                    title="등록된 게시글을 삭제하시겠습니까?"
                    message={`삭제 버튼 클릭 시 등록된 게시글이 \n영구히 삭제됩니다.`}
                    cancelText="취소"
                    confirmText="삭제"
                    handleModalClose={closeModal}
                    onConfirm={() => {
                        handleDeleteRecruitItem();
                    }}
                />
            )}

            {modalType === "success" && (
                <Modal
                    variant="default"
                    title="게시글 삭제 완료"
                    confirmText="확인"
                    handleModalClose={closeModal}
                    onConfirm={closeModal}
                />
            )}
            <Header
                title="나의 공고"
                rightText={
                    filteredRecruits.length > 0 && (
                        <EditTextBox onClick={toggleEditMode}>
                            <Text.Body1 color={isEditTextClicked ? "Black" : "Gray2"}>편집</Text.Body1>
                        </EditTextBox>
                    )
                }
            />

            <Wrapper.FlexBox margin="43px 0 0 0">
                <TabSelector
                    labels={[...TAB_LABELS.OWNER.MY_RECRUIT]}
                    selected={sort}
                    onChange={value => setSort(value as OwnerTabTypes["MY_RECRUIT"])}
                    variant="bold"
                />
            </Wrapper.FlexBox>

            {isEditTextClicked && filteredRecruits.length > 0 && (
                <>
                    <Wrapper.FlexBox justifyContent="space-between">
                        <SelectAllWrapper
                            onClick={() => {
                                const allIds = filteredRecruits.map(item => item.employmentId);
                                const isAllSelected = allIds.every(id => checkedIds.includes(id));
                                setCheckedIds(isAllSelected ? [] : allIds);
                            }}
                        >
                            <Text.Body1 color={checkedIds.length === filteredRecruits.length ? "Main" : "Gray2"}>
                                전체 선택
                            </Text.Body1>
                        </SelectAllWrapper>
                        <Text.Body1
                            color="Gray2"
                            onClick={isDeletable ? () => openModal("confirm") : undefined}
                            style={{ cursor: "pointer" }}
                        >
                            삭제
                        </Text.Body1>
                    </Wrapper.FlexBox>
                </>
            )}

            <Wrapper.FlexBox direction="column" gap="20px">
                {isLoading ? (
                    <SkeletonList variant="guesthouse" count={12} />
                ) : filteredRecruits.length > 0 ? (
                    filteredRecruits.map(item => (
                        <GuesthouseListItem
                            key={item.employmentId}
                            {...item}
                            isEditActive={isEditTextClicked}
                            isChecked={checkedIds.includes(item.employmentId)}
                            onCheckToggle={handleToggleCheck}
                        />
                    ))
                ) : (
                    <Wrapper.FlexBox gap="12px" alignItems="center" direction="column" padding="50% 0">
                        <Oops
                            message="작성된 나의 공고가 없어요."
                            description={`홈 > 게시글 작성하기로\n새로운 공고를 등록해 보세요!`}
                        />
                    </Wrapper.FlexBox>
                )}
            </Wrapper.FlexBox>
        </>
    );
}

const EditTextBox = styled.div`
    width: 34px;
    height: 100%;
    cursor: pointer;
`;

const SelectAllWrapper = styled.div`
    display: flex;
    padding-bottom: 10px;
    cursor: pointer;
    width: 80px;
`;
