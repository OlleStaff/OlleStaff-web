import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { EmploymentPutProps } from "@/types/employment";
import { usePutEmployment } from "@/hooks/owner/employment/usePutEmployment";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import RecruitBasicInfoPage from "@/pages/owner/Recruit/RecruitBasicInfoPage";
import RecruitPrecautionPage from "@/pages/owner/Recruit/RecruitPrecautionPage";

export default function RecruitEditContainer() {
    const navigate = useNavigate();
    const { employmentId } = useParams<{ employmentId: string }>();

    const [formData, setFormData] = useState<EmploymentPutProps>();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [_imageNames, setImageNames] = useState<string[]>([]);

    const { data: employment } = useGetEmploymentDetail(Number(employmentId));
    const { mutate: editEmployment } = usePutEmployment();

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

    const handleEditEmployment = () => {
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

        editEmployment(fd, {
            onSuccess: res => {
                const uploadedImageUrls: string[] = res?.data?.images ?? [];
                const mergedImages = [...imageUrls, ...uploadedImageUrls];

                setImageUrls(mergedImages);
                setImageFiles([]);
                setImageNames(mergedImages);
                setFormData(prev =>
                    prev
                        ? {
                              ...prev,
                              imageUrls: mergedImages,
                              newImages: [],
                          }
                        : prev
                );
            },
            onError: err => {
                console.error("\u274C 수정 실패", err);
                alert("수정에 실패했습니다.");
            },
        });
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
                    <RecruitPrecautionPage
                        mode="edit"
                        formData={formData}
                        setFormData={setFormData as React.Dispatch<React.SetStateAction<EmploymentPutProps>>}
                        handleSubmit={handleEditEmployment}
                    />
                }
            />
        </Routes>
    );
}
