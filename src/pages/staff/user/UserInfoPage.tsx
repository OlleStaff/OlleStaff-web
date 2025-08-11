import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import SettingList from "@/components/SettingList";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import UserModeSwitcher from "../../auth/components/UserModeSwitcher";

const MenuList = [
    {
        id: 1,
        title: "내 정보 관리",
        content: [
            { title: "개인정보 보기", link: "/staff/user/edit-profile" },
            { title: "지원서 보기", link: "/staff/user/application" },
        ],
    },
    {
        id: 2,
        title: "내 활동",
        content: [
            { title: "내가 작성한 게시글", link: "/staff/user/my-posts" },
            { title: "내가 작성한 댓글", link: "/staff/user/my-comments" },
            { title: "내가 작성한 후기", link: "/staff/user/my-reviews" },
            { title: "내가 좋아요 누른 글", link: "/staff/user/my-likes" },
        ],
    },
];

export default function UserInfoPage() {
    const nickname = useUserStore(state => state.nickname);
    const profileImage = useUserStore(state => state.profileImage);

    return (
        <>
            <Header title="내 정보" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" alignItems="center" gap="12px">
                    <img src={profileImage} alt="프로필이미지" style={{ width: "94px", height: "94px" }} />
                    <Text.Title3_1>{nickname}</Text.Title3_1>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox direction="column" gap="12px">
                    <SettingList data={MenuList} />
                </Wrapper.FlexBox>

                <UserModeSwitcher />
            </PageWrapper>
        </>
    );
}
