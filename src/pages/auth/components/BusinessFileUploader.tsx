import { Button } from "@/components/Button";
import { Text } from "@/styles/Text";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRef } from "react";
import { Wrapper } from "@/styles/Wrapper";
import { truncateText } from "@/utils/truncateText";

interface Props {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    setErrorMessgae: React.Dispatch<React.SetStateAction<string>>;
}

const BYTES_IN_MB = 1024 * 1024;
const MAX_FILE_MB = 20;

export default function BusinessFileUploader({ selectedFile, onFileChange, setErrorMessgae }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (file.size > MAX_FILE_MB * BYTES_IN_MB) {
                const msg = `단일 파일 최대 용량은 ${MAX_FILE_MB}MB 입니다.`;
                setErrorMessgae(msg);
                e.target.value = "";
                return;
            }
            setErrorMessgae("");
        }
        onFileChange(file);
    };

    return (
        <Wrapper.FlexBox direction="column" gap="6px">
            <Text.Body1_1>사업자등록증</Text.Body1_1>
            <Wrapper.FlexBox alignItems="flex-end" gap="6px">
                <InputBox>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />
                    {selectedFile ? (
                        <FileName>
                            <Text.Body1>{truncateText(selectedFile.name, 25)}</Text.Body1>
                            <img
                                src="/icons/xButton.svg"
                                alt="X"
                                onClick={() => onFileChange(null)}
                                style={{ cursor: "pointer" }}
                            />
                        </FileName>
                    ) : (
                        <Text.Body1 color="Gray3">파일을 선택하세요.</Text.Body1>
                    )}
                </InputBox>

                <Button label="" width="small" height="small" onClick={handleFileClick} isActive>
                    파일 선택
                </Button>
            </Wrapper.FlexBox>
            {selectedFile && <Text.Body2 color="Gray3">{(selectedFile.size / 1024).toFixed(2)} KB</Text.Body2>}
        </Wrapper.FlexBox>
    );
}

const InputBox = styled.div`
    display: flex;
    align-items: center;
    padding: 0 12px;
    background-color: ${theme.color.Gray0};
    border-radius: 8px;
    height: 40px;
    width: 100%;
`;

const FileName = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
