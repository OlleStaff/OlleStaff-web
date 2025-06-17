import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RecruitPrecautionPage from "./RecruitPrecautionPage";
import RecruitBasicInfoPage from "./RecruitBasicInfoPage";
import { EmploymentPostProps } from "@/types/employment";
import { EmploymentApi } from "@/apis/employment";

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

    const handleSubmit = async () => {
        try {
            await EmploymentApi.postEmployment(formData, imageFiles); // imageFiles는 상태로 보관한 File[]
            alert("공고 등록 완료");
        } catch (error) {
            console.error("공고 등록 실패", error);
        }
    };

    return (
        <Routes>
            <Route
                path="step1"
                element={
                    <RecruitBasicInfoPage
                        mode="create"
                        formData={formData}
                        setFormData={setFormData}
                        setImageFiles={setImageFiles}
                        imageFiles={imageFiles}
                        onNext={() => navigate("/owner/recruit/write/step2")}
                    />
                }
            />
            <Route
                path="step2"
                element={
                    <RecruitPrecautionPage
                        mode="create"
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                    />
                }
            />
        </Routes>
    );
}
