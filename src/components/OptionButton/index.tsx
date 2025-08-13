import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";

type item = { label: string; onClick: () => void; iconSrc?: string };

interface OptionProps {
    menus: item[];
    buttonIcon?: React.ReactNode;
    buttonActiveIcon?: React.ReactNode; // 버튼 활성화됐을때
    placement?: "top" | "bottom"; // 아이콘 기준 dropdown 메뉴 위에 띄울건지 아래에 띄울건지
    align?: "left" | "right"; // 화면 오른쪽에 띄울건지 왼쪽에 띄울건지
}

export default function OptionButton({
    menus,
    buttonIcon,
    buttonActiveIcon,
    placement = "top",
    align = "right",
}: OptionProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpen = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setIsMenuOpen(prev => !prev);
    };
    const handleItemClick = (fn: () => void) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        fn();
    };

    useEffect(() => {
        if (!isMenuOpen) return;
        const escape = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", escape);
    }, [isMenuOpen]);

    return (
        <Wrapper ref={wrapperRef}>
            <TriggerButton onClick={handleMenuOpen}>
                {isMenuOpen
                    ? (buttonActiveIcon ?? <img src="/icons/more.svg" alt="기타" />)
                    : (buttonIcon ?? <img src="/icons/more.svg" alt="기타" />)}
            </TriggerButton>

            {isMenuOpen && (
                <DropMenuWrapper data-placement={placement} data-align={align}>
                    {menus.map((item, i) => (
                        <div key={i}>
                            <MenuItem onClick={handleItemClick(item.onClick)}>
                                <Text.Body2 color="Gray4">{item.label}</Text.Body2>
                            </MenuItem>
                            {i < menus.length - 1 && <Divider aria-hidden />}
                        </div>
                    ))}
                </DropMenuWrapper>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const TriggerButton = styled.button`
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
`;

const DropMenuWrapper = styled.div`
    position: absolute;
    min-width: 110px;
    background: ${theme.color.White};
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

    overflow: hidden;
    z-index: 10;

    &[data-placement="top"] {
        bottom: 50px;
    }
    &[data-placement="bottom"] {
        top: 20px;
    }
    &[data-align="right"] {
        right: 0px;
    }
    &[data-align="left"] {
        left: -8px;
    }
`;

const MenuItem = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 8px;
    background: none;
    border: 0;
    cursor: pointer;
    &:hover {
        background: ${theme.color.Gray0};
    }
`;
const Divider = styled.div`
    height: 1px;
    background: ${theme.color.Gray2};
    margin: 0 8px;
`;
