import { useEffect, useState } from "react";

interface BusinessVerificationStorage {
    businessName: string;
    isAgreed: boolean;
    selectedFile?: {
        name: string;
        base64: string;
    };
}

export default function useBusinessVerification(storageKey = "businessVerification"): UseBusinessVerification {
    const [businessName, setBusinessName] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    // 로컬스토리지에 입력하던 값 존재하는지 확인
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return;
        try {
            const parsed: BusinessVerificationStorage = JSON.parse(saved);

            if (parsed.businessName) setBusinessName(parsed.businessName);
            if (typeof parsed.isAgreed === "boolean") setIsAgreed(parsed.isAgreed);

            const fileInfo = parsed.selectedFile;
            if (fileInfo?.base64 && fileInfo.name) {
                const [meta, data] = fileInfo.base64.split(",");
                const byteString = atob(data);
                const mime = meta.split(":")[1].split(";")[0];

                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

                setSelectedFile(new File([ab], fileInfo.name, { type: mime }));
            }
        } catch (err) {
            console.error(err);
        }
    }, [storageKey]);

    // 값 바뀔 때마다 로컬스토리지에 입력하던 값 저장
    useEffect(() => {
        const nothingTyped = !businessName && !isAgreed && !selectedFile;
        if (nothingTyped) {
            localStorage.removeItem(storageKey);
            return;
        }
        const saveToStorage = (fileData?: { name: string; base64: string }) => {
            const payload: BusinessVerificationStorage = {
                businessName,
                isAgreed,
                ...(fileData && { selectedFile: fileData }),
            };
            localStorage.setItem(storageKey, JSON.stringify(payload));
        };

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                saveToStorage({
                    name: selectedFile.name,
                    base64: reader.result as string,
                });
            };
            reader.readAsDataURL(selectedFile);
        } else {
            saveToStorage();
        }
    }, [businessName, selectedFile, isAgreed, storageKey]);

    const clearDraft = () => {
        setBusinessName("");
        setSelectedFile(null);
        setIsAgreed(false);
        localStorage.removeItem(storageKey);
    };

    return {
        businessName,
        setBusinessName,
        selectedFile,
        setSelectedFile,
        isAgreed,
        setIsAgreed,
        clearDraft,
    };
}

export interface UseBusinessVerification {
    businessName: string;
    setBusinessName: React.Dispatch<React.SetStateAction<string>>;
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
    isAgreed: boolean;
    setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>;
    clearDraft: () => void;
}
