import { EmploymentPutProps } from "@/types/employment";
import { Button } from "@/components/Button";
import DropdownButton from "@/components/DropdownButton";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import Textarea from "@/components/Textarea";
import { Wrapper } from "@/styles/Wrapper";
import { formatDateInput } from "@/utils/date";
import { useParams } from "react-router-dom";
import { useGetEmploymentDetail } from "@/hooks/owner/employment";
import HashTagEditor from "../../components/HashTagEditor";
import BenefitListEditor from "../../components/BenefitListEditor";
import LocationSelector from "../../components/LocationSelector";
import CategorySelector from "../../components/CategorySelector";
import { useMemo } from "react";
import { getVisibleDateErrors } from "@/utils/validateRecruitDate";
import { Text } from "@/styles/Text";

interface Props {
    formData: EmploymentPutProps;
    setFormData: React.Dispatch<React.SetStateAction<EmploymentPutProps>>;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    setImageNames: React.Dispatch<React.SetStateAction<string[]>>;
    onNext: () => void;
}

export default function RecruitEditBasicInfoPage({
    formData,
    setFormData,
    setImageFiles,
    imageUrls,
    setImageUrls,
    setImageNames,
    onNext,
}: Props) {
    const hasBenefits = formData.benefitsContent.some(b => b.trim().length > 0);
    const url = formData.instarUrl.trim();
    const hasValidUrl = url.length >= 10 && url.length <= 100;
    const hasImages = (formData.imageUrls?.length ?? 0) > 0 || (formData.newImages?.length ?? 0) > 0;
    const isFormValid = Boolean(
        formData.title.trim() &&
            hasValidUrl &&
            hasImages &&
            formData.startedAt.trim() &&
            formData.endedAt.trim() &&
            formData.recruitmentEnd.trim() &&
            formData.content.trim() &&
            hasBenefits &&
            formData.locationName.trim() &&
            formData.category.trim() &&
            formData.personNum > 0 &&
            formData.sex &&
            formData.latitude !== 0 &&
            formData.longitude !== 0 &&
            formData.precautions.length > 0
    );

    const { employmentId } = useParams<{ employmentId: string }>();
    const { data: employment } = useGetEmploymentDetail(Number(employmentId));

    const isModified = employment?.data
        ? formData.title.trim() !== employment.data.title.trim() ||
          formData.instarUrl.trim() !== employment.data.instarUrl.trim() ||
          formData.startedAt.trim() !== employment.data.startedAt.trim() ||
          formData.endedAt.trim() !== employment.data.endedAt.trim() ||
          formData.recruitmentEnd.trim() !== employment.data.recruitmentEnd.trim() ||
          formData.content.trim() !== employment.data.content.trim() ||
          formData.locationName.trim() !== employment.data.locationName.trim() ||
          formData.category.trim() !== employment.data.category.trim() ||
          formData.personNum !== employment.data.personNum ||
          formData.sex !== employment.data.sex ||
          formData.latitude !== employment.data.latitude ||
          formData.longitude !== employment.data.longitude ||
          JSON.stringify(formData.benefitsContent) !== JSON.stringify(employment.data.benefitsContent) ||
          JSON.stringify(formData.hashtagName ?? []) !== JSON.stringify(employment.data.hashtagName ?? []) ||
          JSON.stringify(employment.data.images) !== JSON.stringify(formData.imageUrls) ||
          formData.newImages.length !== 0
        : false;

    const visibleErrors = useMemo(
        () =>
            getVisibleDateErrors({
                startedAt: formData.startedAt,
                endedAt: formData.endedAt,
                recruitmentEnd: formData.recruitmentEnd,
            }),
        [formData.startedAt, formData.endedAt, formData.recruitmentEnd]
    );

    return (
        <>
            <Header title="게시글 수정" showBackButton />

            <Wrapper.FlexBox margin="43px 0 0 0" direction="column" gap="20px">
                <ImageUploader
                    maxImages={9}
                    initialFiles={formData.newImages}
                    previewImageUrls={imageUrls}
                    onChange={({ urls, files, names }) => {
                        const uniqueNames = [...new Set(names)];
                        setImageUrls(urls);
                        setImageFiles(files);
                        setImageNames(uniqueNames);
                        setFormData(prev => ({ ...prev, imageUrls: urls, newImages: files }));
                    }}
                />

                <HashTagEditor
                    values={formData.hashtagName ?? []}
                    onChange={updated => setFormData(prev => ({ ...prev, hashtagName: updated }))}
                />

                <Input
                    inputTitle="게시글 제목"
                    placeholder="게시할 글의 제목을 작성해주세요."
                    variant="default"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    maxLength={35}
                />

                <Input
                    inputTitle="인스타 및 링크 URL"
                    placeholder="게스트하우스 대표 링크 1개를 첨부해 주세요."
                    variant="default"
                    value={formData.instarUrl}
                    onChange={e => setFormData(prev => ({ ...prev, instarUrl: e.target.value }))}
                    required
                    minLength={10}
                    maxLength={100}
                />

                <Wrapper.FlexBox gap="20px">
                    <Wrapper.FlexBox width="120px">
                        <DropdownButton
                            dropTitle="모집 인원"
                            label={`${formData.personNum || "0 "}명`}
                            options={Array.from({ length: 99 }, (_, i) => (i + 1).toString())}
                            onSelect={value => setFormData(prev => ({ ...prev, personNum: parseInt(value) }))}
                            required
                        />
                    </Wrapper.FlexBox>

                    <RadioButton
                        radioTitle="성별"
                        labelList={["전체", "남자", "여자"]}
                        selectedIndex={formData.sex === "all" ? 0 : formData.sex === "male" ? 1 : 2}
                        onSelect={index => {
                            const value = index === 0 ? "all" : index === 1 ? "male" : "female";
                            setFormData(prev => ({ ...prev, sex: value }));
                        }}
                        required
                    />
                </Wrapper.FlexBox>

                <Wrapper.FlexBox justifyContent="space-between">
                    <Wrapper.FlexBox width="48%" direction="column" alignItems="flex-end">
                        <Input
                            inputTitle="시작일"
                            placeholder="예) 2025-02-08"
                            variant="default"
                            value={formData.startedAt}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    startedAt: formatDateInput(e.target.value),
                                }))
                            }
                            required
                        />
                        {visibleErrors.startedAt && (
                            <Text.Caption1 color="Red1">{visibleErrors.startedAt}</Text.Caption1>
                        )}
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox width="48%" direction="column" alignItems="flex-end">
                        <Input
                            inputTitle="종료일"
                            placeholder="예) 2025-12-22"
                            variant="default"
                            value={formData.endedAt}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    endedAt: formatDateInput(e.target.value),
                                }))
                            }
                            required
                        />
                        {visibleErrors.endedAt && <Text.Caption1 color="Red1">{visibleErrors.endedAt}</Text.Caption1>}
                    </Wrapper.FlexBox>
                </Wrapper.FlexBox>
                <Wrapper.FlexBox direction="column" alignItems="flex-end">
                    <Input
                        inputTitle="모집 마감일"
                        placeholder="예) 2025-02-01"
                        variant="default"
                        value={formData.recruitmentEnd}
                        onChange={e =>
                            setFormData(prev => ({
                                ...prev,
                                recruitmentEnd: formatDateInput(e.target.value),
                            }))
                        }
                        required
                    />
                    {visibleErrors.recruitmentEnd && visibleErrors.recruitmentEnd && (
                        <Text.Caption1 color="Red1">{visibleErrors.recruitmentEnd}</Text.Caption1>
                    )}
                </Wrapper.FlexBox>
                <Textarea
                    textareaTitle="게스트 하우스 소개글"
                    placeholder="소개글을 입력해 주세요."
                    value={formData.content}
                    onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    variant="flat-lg"
                    maxLength={500}
                    required
                />

                <BenefitListEditor
                    values={formData.benefitsContent}
                    onChange={updated => setFormData(prev => ({ ...prev, benefitsContent: updated }))}
                    required
                />

                <LocationSelector
                    locationName={formData.locationName}
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    onChange={(lat, lng, name) =>
                        setFormData(prev => ({ ...prev, latitude: lat, longitude: lng, locationName: name }))
                    }
                    required
                />

                <CategorySelector
                    value={formData.category}
                    onChange={category => setFormData(prev => ({ ...prev, category }))}
                    required
                />

                <Button
                    label="다음으로"
                    width="large"
                    onClick={onNext}
                    disabled={!isFormValid || !isModified}
                    isActive={isFormValid && isModified}
                >
                    다음으로
                </Button>
            </Wrapper.FlexBox>
        </>
    );
}
