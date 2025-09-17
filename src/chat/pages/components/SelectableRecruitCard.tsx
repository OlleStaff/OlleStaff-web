import styled from "@emotion/styled";
import { GuesthouseListItem } from "@/components/GuesthouseList/GuesthouseListItem";
import { GuesthouseListItemProps } from "@/types/guesthouse";

interface Props {
    item: GuesthouseListItemProps;
    selected?: boolean;
    onSelect: (employmentId: number) => void;
}

export default function SelectableRecruitCard({ item, selected = false, onSelect }: Props) {
    const handleClick = () => {
        onSelect(item.employmentId);
    };

    return (
        <Wrapper>
            <GuesthouseListItem {...item} image={item.image} isEditActive={false} isChecked={false} />
            <Overlay role="button" $selected={selected} onClick={handleClick} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
`;

const Overlay = styled.button<{ $selected: boolean }>`
    position: absolute;
    inset: 0;
    background: transparent;
    border: 1px solid ${({ theme, $selected }) => ($selected ? theme.color.Main : "transparent")};
    border-radius: 8px;
    padding: 0;
    cursor: pointer;
`;
