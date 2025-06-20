import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

type NavProps = {
    version: "owner" | "staff";
};

const items = {
    owner: [
        { src: "/icons/navHome.svg", alt: "홈", label: "홈", path: "/owner" },
        { src: "/icons/navRecruit.svg", alt: "나의 공고", label: "나의 공고", path: "/owner/recruitments-ongoing" },
        { src: "/icons/navChat.svg", alt: "채팅", label: "채팅", path: "/chat" },
        { src: "/icons/navUser.svg", alt: "내 정보", label: "내 정보", path: "/owner/userinfo" },
    ],
    staff: [
        { src: "/icons/navHome.svg", alt: "홈", label: "홈", path: "/staff" },
        { src: "/icons/navCompanion.svg", alt: "동행", label: "동행", path: "/staff/accompany" },
        { src: "/icons/navChat.svg", alt: "채팅", label: "채팅", path: "/chat" },
        { src: "/icons/navUser.svg", alt: "내 정보", label: "내 정보", path: "/staff/userinfo" },
    ],
};

export default function Nav({ version }: NavProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const navMenu = items[version];

    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <NavWrapper>
            <Wrapper.FlexBox justifyContent="space-between" alignItems="flex-end">
                {navMenu.map((item, index) => {
                    const normalizePath = (path: string) => path.replace(/\/+$/, "");
                    const isActive = normalizePath(location.pathname) === normalizePath(item.path);
                    const activeSrc = item.src.replace(".svg", "Main.svg");

                    return (
                        <Wrapper.FlexBox
                            key={index}
                            width="70px"
                            height="78px"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            gap="14px"
                            pointer
                            onClick={() => handleClick(item.path)}
                        >
                            <img src={isActive ? activeSrc : item.src} alt={item.alt} />
                            <Text.Body1_1 style={{ color: isActive ? theme.color.Main : theme.color.Gray3 }}>
                                {item.label}
                            </Text.Body1_1>
                        </Wrapper.FlexBox>
                    );
                })}
            </Wrapper.FlexBox>
        </NavWrapper>
    );
}

const NavWrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 393px;
    margin: 0 auto; // 가운데 정렬
    height: 78px;
    z-index: 10;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 0 30px;
    background-color: white;
    // 사파리 홈 인디케이터와 겹치지 않게 Safe Area 지원
    padding-bottom: env(safe-area-inset-bottom);
`;
