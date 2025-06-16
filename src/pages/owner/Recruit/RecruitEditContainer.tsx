import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import RecruitPrecautionPage from "./RecruitPrecautionPage";
import RecruitBasicInfoPage from "./RecruitBasicInfoPage";
import { EmploymentPutProps } from "@/types/employment";
import { EmploymentApi } from "@/apis/employment";
import { useEmploymentDetail } from "@/hooks/owner/employment/useEmploymentDetail";

export default function RecruitEditContainer() {
    const { employmentId } = useParams();
    const navigate = useNavigate();

    const { data } = useEmploymentDetail(Number(employmentId));
    const employmentData = data?.data;

    const [formData, setFormData] = useState<EmploymentPutProps | null>(null);

    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleEdit = async () => {
        if (!formData) return;

        try {
            await EmploymentApi.putEmployment(formData, imageFiles);
            alert("공고 수정 완료");
        } catch (error) {
            console.error("공고 수정 실패", error);
        }
    };

    useEffect(() => {
        if (employmentData) {
            const transformedData: EmploymentPutProps = {
                employmentId: employmentData.employmentId,
                title: employmentData.title,
                content: employmentData.content,
                instarUrl: employmentData.instarUrl,
                personNum: employmentData.personNum,
                sex: employmentData.sex,
                startedAt: employmentData.startedAt,
                endedAt: employmentData.endedAt,
                recruitmentEnd: employmentData.recruitmentEnd,
                latitude: employmentData.latitude,
                longitude: employmentData.longitude,
                locationName: employmentData.locationName,
                hashtagName: employmentData.hashtagName,
                benefitsContent: employmentData.benefitsContent,
                category: employmentData.category,
                precautions: [],
                images: employmentData.images ?? [],
            };

            setFormData(transformedData);

            setImageFiles([]);
        }
    }, [employmentData]);

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
                        onNext={() => navigate(`/owner/recruit/edit/${employmentId}/step2`)}
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
