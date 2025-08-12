import Header from "@/components/Header";
import SettingList from "@/components/SettingList";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";
import UserModeSwitcher from "@/pages/auth/components/UserModeSwitcher"; // 경로는 프로젝트에 맞게
import theme from "@/styles/theme";

type MenuItem = { title: string; link: string };
type MenuSection = { id: number; title: string; content: MenuItem[] };

const STAFF_MENU: MenuSection[] = [
    {
        id: 1,
        title: "내 정보 관리",
        content: [
            { title: "개인정보 보기", link: "/user/edit-profile" },
            { title: "지원서 보기", link: "/user/application" },
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

const OWNER_MENU: MenuSection[] = [
    {
        id: 1,
        title: "내 정보 관리",
        content: [{ title: "개인정보 수정", link: "/user/edit-profile" }],
    },
    {
        id: 2,
        title: "내 활동",
        content: [{ title: "후기 관리", link: "/owner/userinfo/reviews" }],
    },
];

export default function UserInfoPage() {
    const nickname = useUserStore(s => s.nickname);
    const profileImage = useUserStore(s => s.profileImage);
    const type = useUserStore(s => s.type as "STAFF" | "GUESTHOUSE");

    const menu = type === "GUESTHOUSE" ? OWNER_MENU : STAFF_MENU;
    const fallbackImg = profileImage || "/icons/defaultUser.svg";

    return (
        <>
            <Header title="내 정보" />

            <Wrapper.FlexBox direction="column" alignItems="center" gap="12px">
                <Avatar
                    src={profileImage || fallbackImg}
                    onError={e => ((e.currentTarget.src = fallbackImg), (e.currentTarget.onerror = null))}
                    alt="프로필이미지"
                />
                <Text.Title3_1>{nickname}</Text.Title3_1>

                <Wrapper.FlexBox direction="column" gap="12px">
                    <SettingList data={menu} />
                </Wrapper.FlexBox>
            </Wrapper.FlexBox>

            <UserModeSwitcher />
        </>
    );
}

const Avatar = styled.img`
    width: 94px;
    height: 94px;
    border-radius: 10px;
    object-fit: cover;
    margin-top: ${theme.size.HeaderHeight};
`;
