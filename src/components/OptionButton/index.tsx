import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";

interface OptionProps {
    items: {
        label: string;
        onClick: () => void;
    }[];
}

export default function OptionButton({ items }: OptionProps) {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const handleOpenMenu = () => {
        setIsOpenMenu(prev => !prev);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpenMenu(false);
            }
        };

        if (isOpenMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenMenu]);

    return (
        <OptionButtonWrapper ref={wrapperRef} onClick={handleOpenMenu}>
            <img src="/icons/more.svg" alt="기타" />
            {isOpenMenu &&
                items.map((item, index) => (
                    <DropMenuWrapper key={index} onClick={item.onClick}>
                        <Text.Body2 color="Gray3">{item.label}</Text.Body2>
                    </DropMenuWrapper>
                ))}
        </OptionButtonWrapper>
    );
}

const DropMenuWrapper = styled.div`
    position: absolute;
    top: 19px;
    right: 0;
    width: 100px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    z-index: 10;
`;

const OptionButtonWrapper = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    padding: 6px 0;
`;
