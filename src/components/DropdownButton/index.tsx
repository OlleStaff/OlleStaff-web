import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import { Wrapper } from "@/styles/Wrapper";
import theme from "@/styles/theme";

export interface DropdownButtonProps {
    label: string;
    options: string[];
    onSelect?: (option: string) => void;
    dropTitle?: string;
    required?: boolean;
}

export default function DropdownButton({ label, options, onSelect, dropTitle, required }: DropdownButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleSelect = (option: string) => {
        onSelect?.(option);
        setIsOpen(false);
    };

    // 영역 밖 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Wrapper.FlexBox direction="column" gap="12px">
            <Text.Body1_1>
                {dropTitle} {required && <RequiredStar>*</RequiredStar>}
            </Text.Body1_1>
            <Style.Wrapper ref={wrapperRef}>
                <Style.Button onClick={toggleDropdown}>{label}</Style.Button>
                {isOpen && (
                    <Style.DropdownMenu>
                        {options.map((option, index) => (
                            <Style.DropdownItem key={index} onClick={() => handleSelect(option)}>
                                {option}
                            </Style.DropdownItem>
                        ))}
                    </Style.DropdownMenu>
                )}
            </Style.Wrapper>
        </Wrapper.FlexBox>
    );
}

const Style = {
    Wrapper: styled.div`
        position: relative;
        display: inline-block;
    `,
    Button: styled.button`
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        background-color: ${theme.color.Gray0};
        cursor: pointer;
        font-size: 14px;
        color: #333;

        &:hover {
            background-color: #f7f7f7;
        }
        outline: 0;
        &:focus-within {
            box-shadow: inset 0 0 0 1px ${theme.color.Main};
            transition: 0.3s;
        }
    `,
    DropdownMenu: styled.div`
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        border: 1px solid #ccc;
        background-color: ${theme.color.Gray0};
        border-radius: 8px;
        min-width: 100%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 999;
        max-height: 300px;
        overflow: scroll;
        scrollbar-width: none;
    `,
    DropdownItem: styled.div`
        padding: 8px 12px;
        font-size: 14px;
        color: #333;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    `,
};

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
