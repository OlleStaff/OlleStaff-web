import RadioButton from "@/components/RadioButton";
import { categoryMap } from "@/constants/categories";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import styled from "@emotion/styled";

interface CategorySelectorProps {
    value: string;
    onChange: (category: string) => void;
    required?: boolean;
}

export default function CategorySelector({ value, onChange, required }: CategorySelectorProps) {
    const categories = ["대규모", "소규모", "뷰맛집", "힐링", "체험"];

    const reverseMap: Record<string, string> = Object.fromEntries(
        Object.entries(categoryMap).map(([ko, en]) => [en, ko])
    );

    const getSelectedIndex = (value: string) => {
        const selectedCategory = reverseMap[value];
        return selectedCategory ? categories.indexOf(selectedCategory) : 0;
    };

    return (
        <Wrapper.FlexBox direction="column">
            <Wrapper.FlexBox alignItems="flex-start" justifyContent="space-between">
                <Text.Body1_1>게스트하우스 카테고리 {required && <RequiredStar>*</RequiredStar>}</Text.Body1_1>
                <Text.Body3_1 color="Gray4">* 최대 1개만 선택할 수 있습니다.</Text.Body3_1>
            </Wrapper.FlexBox>

            <RadioButton
                key={value}
                labelList={categories}
                selectedIndex={getSelectedIndex(value)}
                onSelect={index => onChange(categoryMap[categories[index]])}
            />
        </Wrapper.FlexBox>
    );
}

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
