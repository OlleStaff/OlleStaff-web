import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import RecruitPrecautionPage from "./RecruitPrecautionPage";
import RecruitBasicInfoPage from "./RecruitBasicInfoPage";
import { EmploymentPutProps } from "@/types/employment";

import { usePutEmployment } from "@/hooks/owner/employment/usePutEmployment";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";

export default function RecruitEditContainer() {
    const { employmentId } = useParams();
    const navigate = useNavigate();

    const { data } = useGetEmploymentDetail(Number(employmentId));
    const employmentData = data?.data;

    const [formData, setFormData] = useState<EmploymentPutProps | null>(null);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const { mutate } = usePutEmployment();

    const handleEdit = () => {
        if (!formData) return;
        mutate({ formData, imageFiles });
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
                precautions: employmentData.precautions,
                images: employmentData.images ?? [],
            };

            setFormData(transformedData);
            setImageUrls(data.data.images || []);
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
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
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
