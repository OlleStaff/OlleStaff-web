import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import SettingList from "@/components/SettingList";
import { useUserStore } from "@/store/useUserStore";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import UserModeSwitcher from "../auth/components/UserModeSwitcher";

const MenuList = [
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
    const user = {
        image: "/icons/defaultUser.svg", // 임시 프로필 이미지
        name: useUserStore(state => state.nickname),
    };

    return (
        <>
            <Header title="내 정보" />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" alignItems="center" gap="12px">
                    <img src={user.image} alt="프로필이미지" style={{ width: "94px" }} />
                    <Text.Title3_1>{user.name}</Text.Title3_1>
                </Wrapper.FlexBox>

                <Wrapper.FlexBox direction="column">
                    <SettingList data={MenuList} />
                    <UserModeSwitcher />
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
