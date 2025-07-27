import { useState } from "react";
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import RecruitPrecautionPage from "./RecruitPrecautionPage";
import RecruitBasicInfoPage from "./RecruitBasicInfoPage";
import { EmploymentPutProps } from "@/types/employment";
import { usePutEmployment } from "@/hooks/owner/employment/usePutEmployment";

export default function RecruitEditContainer() {
    const { employmentId } = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const initialData = location.state;

    const [formData, setFormData] = useState<EmploymentPutProps>({
        ...initialData,
        imageUrls: initialData.images ?? [],
        newImages: [],
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>(initialData.images ?? []);

    const { mutate } = usePutEmployment();

    const handleEdit = () => {
        if (!formData) return;
        mutate(formData);
    };

    if (!formData) return null;

    return (
        <Routes>
            <Route
                path="step1"
                element={
                    <RecruitBasicInfoPage
                        mode="edit"
                        formData={formData}
                        setFormData={setFormData as React.Dispatch<React.SetStateAction<EmploymentPutProps>>}
                        imageFiles={imageFiles}
                        setImageFiles={setImageFiles}
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        onNext={() =>
                            navigate(`/owner/recruit/edit/${employmentId}/step2`, {
                                state: formData,
                            })
                        }
                    />
                }
            />
            <Route
                path="step2"
                element={
                    <RecruitPrecautionPage
                        mode="edit"
                        formData={formData}
                        setFormData={setFormData as React.Dispatch<React.SetStateAction<EmploymentPutProps>>}
                        handleSubmit={handleEdit}
                    />
                }
            />
        </Routes>
    );
}
