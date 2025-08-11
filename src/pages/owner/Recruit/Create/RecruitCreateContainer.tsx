import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { EmploymentPostProps } from "@/types/employment";
import { usePostEmployment } from "@/hooks/owner/employment/usePostEmployment";
import RecruitCreateBasicInfoPage from "./RecruitCreateBasicInfoPage";
import RecruitCreatePrecautionPage from "./RecruitCreatePrecautionPage";

const initialFormData: EmploymentPostProps = {
    instarUrl: "",
    personNum: 0,
    sex: "all",
    startedAt: "",
    endedAt: "",
    recruitmentEnd: "",
    title: "",
    content: "",
    category: "LARGE",
    latitude: 0,
    longitude: 0,
    locationName: "",
    hashtagName: [],
    benefitsContent: [],
    precautions: [{ precautionsTitle: "", precautionsContent: "" }],
};

export default function RecruitCreateContainer() {
    const [formData, setFormData] = useState<EmploymentPostProps>(initialFormData);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const navigate = useNavigate();
    const createMutation = usePostEmployment();
    const handleNextStep = () => {
        navigate("/owner/recruit/write/step2");
    };

    const handleSubmit = async () => {
        createMutation.mutate(
            {
                employment: formData,
                imageFiles,
            },
            {
                onSuccess: () => {
                    alert("공고 등록 완료!");
                    navigate("/owner");
                },
            }
        );
    };

    return (
        <Routes>
            <Route
                path="step1"
                element={
                    <RecruitCreateBasicInfoPage
                        formData={formData}
                        setFormData={setFormData}
                        setImageFiles={setImageFiles}
                        onNext={handleNextStep}
                    />
                }
            />
            <Route
                path="step2"
                element={
                    <RecruitCreatePrecautionPage
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                    />
                }
            />
        </Routes>
    );
}
