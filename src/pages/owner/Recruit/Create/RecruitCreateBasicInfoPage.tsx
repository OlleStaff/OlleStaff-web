import { EmploymentPostProps } from "@/types/employment";
import { Button } from "@/components/Button";
import DropdownButton from "@/components/DropdownButton";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import Input from "@/components/Input";
import PageWrapper from "@/components/PageWrapper";
import RadioButton from "@/components/RadioButton";
import Textarea from "@/components/Textarea";
import { Wrapper } from "@/styles/Wrapper";
import { formatDateInput } from "@/utils/date";
import HashTagEditor from "../../components/HashTagEditor";
import BenefitListEditor from "../../components/BenefitListEditor";
import LocationSelector from "../../components/LocationSelector";
import CategorySelector from "../../components/CategorySelector";

interface RecruitBasicInfoPageCreateProps {
    formData: EmploymentPostProps;
    setFormData: React.Dispatch<React.SetStateAction<EmploymentPostProps>>;
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    onNext: () => void;
}

export default function RecruitCreateBasicInfoPage({
    formData,
    setFormData,
    imageFiles,
    setImageFiles,
    onNext,
}: RecruitBasicInfoPageCreateProps) {
    const hasBenefits = formData.benefitsContent.some(b => b.trim().length > 0);
    const url = formData.instarUrl.trim();
    const hasValidUrl = url.length >= 10 && url.length <= 100;
    const hasImages = imageFiles.length > 0;
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

    return (
        <>
            <Header title="게시글 작성" showBackButton />
            <PageWrapper hasHeader>
                <Wrapper.FlexBox direction="column" gap="20px">
                    <ImageUploader
                        maxImages={9}
                        onChange={({ files }) => {
                            setImageFiles(files);
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
                        maxLength={200}
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
                            labelList={["모두", "남자", "여자"]}
                            selectedIndex={formData.sex === "all" ? 0 : formData.sex === "male" ? 1 : 2}
                            onSelect={index => {
                                const value = index === 0 ? "all" : index === 1 ? "male" : "female";
                                setFormData(prev => ({ ...prev, sex: value }));
                            }}
                            required
                        />
                    </Wrapper.FlexBox>
                    <Wrapper.FlexBox justifyContent="space-between">
                        <Wrapper.FlexBox width="48%">
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
                        </Wrapper.FlexBox>
                        <Wrapper.FlexBox width="48%">
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
                        </Wrapper.FlexBox>
                    </Wrapper.FlexBox>
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
                            setFormData(prev => ({
                                ...prev,
                                latitude: lat,
                                longitude: lng,
                                locationName: name,
                            }))
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
                        disabled={!isFormValid}
                        isActive={isFormValid}
                    >
                        다음으로
                    </Button>
                </Wrapper.FlexBox>
            </PageWrapper>
        </>
    );
}
