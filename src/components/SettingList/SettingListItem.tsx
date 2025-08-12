import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string;
    link: string;
}

export default function SettingListItem({ title, link }: Props) {
    const navigate = useNavigate();

    return (
        <>
            <Style.Wrapper onClick={() => navigate(link)}>
                <Text.Body1_1 color="Gray4">{title}</Text.Body1_1>
                <img src="/icons/arrow.svg" alt="이동 아이콘" />
            </Style.Wrapper>
        </>
    );
}

const Style = {
    Wrapper: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid ${theme.color.LightGray};
        padding: 10px 0;
    `,
};
