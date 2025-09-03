import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { EmploymentPutProps } from "@/types/employment";
import { usePutEmployment } from "@/hooks/owner/employment/usePutEmployment";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import RecruitEditBasicInfoPage from "./RecruitEditBasicInfoPage";
import RecruitEditPrecautionPage from "./RecruitEditPrecautionPage";

export default function RecruitEditContainer() {
    const navigate = useNavigate();
    const { employmentId } = useParams<{ employmentId: string }>();

    const [formData, setFormData] = useState<EmploymentPutProps>();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [_imageNames, setImageNames] = useState<string[]>([]);

    const { data: employment } = useGetEmploymentDetail(Number(employmentId));
    const { mutateAsync: editEmployment } = usePutEmployment();

    useEffect(() => {
        if (employment?.data) {
            const {
                employmentId,
                instarUrl,
                personNum,
                sex,
                startedAt,
                endedAt,
                recruitmentEnd,
                title,
                content,
                category,
                latitude,
                longitude,
                locationName,
                hashtagName,
                benefitsContent,
                precautions,
                images,
            } = employment.data;

            const converted: EmploymentPutProps = {
                employmentId,
                instarUrl,
                personNum,
                sex,
                startedAt,
                endedAt,
                recruitmentEnd,
                title,
                content,
                category,
                latitude,
                longitude,
                locationName,
                hashtagName,
                benefitsContent,
                precautions,
                imageUrls: images ?? [],
                newImages: [],
            };

            setFormData(converted);
            setImageUrls(images ?? []);
            setImageFiles([]);
            setImageNames([...new Set(images ?? [])]); // 중복 제거
        }
    }, [employment]);

    const handleEditEmployment = async () => {
        if (!formData) return;

        const { newImages, imageUrls, ...employmentPayload } = formData;

        const fd = new FormData();
        const payload = {
            ...employmentPayload,
            imageUrls: imageUrls ?? [],
        };

        fd.append("employment", new Blob([JSON.stringify(payload)], { type: "application/json" }));

        imageFiles.forEach(file => {
            fd.append("images", file);
        });

        const res = await editEmployment(fd);

        const uploadedImageUrls: string[] = res?.data?.images ?? [];
        const mergedImages = [...(imageUrls ?? []), ...uploadedImageUrls];

        setImageUrls(mergedImages);
        setImageFiles([]);
        setImageNames(mergedImages);
        setFormData(prev => (prev ? { ...prev, imageUrls: mergedImages, newImages: [] } : prev));
    };

    if (!formData) return null;

    return (
        <Routes>
            <Route
                path="step1"
                element={
                    <RecruitEditBasicInfoPage
                        formData={formData}
                        setFormData={setFormData as React.Dispatch<React.SetStateAction<EmploymentPutProps>>}
                        setImageFiles={setImageFiles}
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        setImageNames={setImageNames}
                        onNext={() => navigate(`/owner/recruit/edit/${employmentId}/step2`)}
                    />
                }
            />
            <Route
                path="step2"
                element={
                    <RecruitEditPrecautionPage
                        formData={formData}
                        setFormData={setFormData as React.Dispatch<React.SetStateAction<EmploymentPutProps>>}
                        handleSubmit={handleEditEmployment}
                    />
                }
            />
        </Routes>
    );
}
