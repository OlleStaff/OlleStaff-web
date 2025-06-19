import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/styles/Text";
import theme from "@/styles/theme";
import { Wrapper } from "@/styles/Wrapper";
import { DaumPostcodeEmbed as RawPostcode } from "react-daum-postcode";

const DaumPostcodeEmbed = RawPostcode as unknown as React.FC<any>;
interface LocationSelectorProps {
    latitude: number;
    longitude: number;
    locationName: string;
    onChange: (lat: number, lng: number, locationName: string) => void;
    required?: boolean;
}

export default function LocationSelector({ locationName, onChange, required }: LocationSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState("");

    const onToggleModal = () => setIsOpen(prev => !prev);

    const handleAddressChange = (data: { address: string }) => {
        setAddress(data.address);
        setIsOpen(false);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(data.address, (result: { x: string; y: string }[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const { x, y } = result[0]; // x: 경도, y: 위도
                const lat = parseFloat(y);
                const lng = parseFloat(x);
                setAddress(data.address);
                setIsOpen(false);
                onChange(lat, lng, data.address);
            } else {
                alert("주소의 좌표를 찾을 수 없습니다.");
            }
        });
    };

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false&libraries=services`;
            script.async = true;
            script.onload = () => {
                window.kakao.maps.load(() => {
                    console.log("Kakao Maps SDK 로드 완료");
                });
            };
            document.head.appendChild(script);
        }
    }, []);

    useEffect(() => {
        setAddress(locationName);
    }, [locationName]);

    return (
        <>
            <Text.Body1_1>위치 선택 {required && <RequiredStar>*</RequiredStar>}</Text.Body1_1>

            <Style.AddressSelectorWrapper onClick={onToggleModal}>
                {address === "" ? (
                    <Wrapper.FlexBox gap="8px" alignItems="center">
                        <img src="/icons/searchIcon.svg" alt="위치 검색" style={{ width: "14px" }} />
                        <Text.Body1 color="Gray3"> 위치를 선택해주세요.</Text.Body1>
                    </Wrapper.FlexBox>
                ) : (
                    <Text.Body1>{address}</Text.Body1>
                )}
            </Style.AddressSelectorWrapper>

            {isOpen && (
                <Modal variant="page" handleModalClose={onToggleModal}>
                    <Style.PostcodeWrapper>
                        <DaumPostcodeEmbed onComplete={handleAddressChange} />
                    </Style.PostcodeWrapper>
                </Modal>
            )}
        </>
    );
}

const Style = {
    AddressSelectorWrapper: styled.button`
        display: flex;
        width: 333px;
        height: 40px;
        border-radius: 8px;
        padding: 10px 17px;
        background-color: ${theme.color.Gray0};
        border: none;
        cursor: pointer;
    `,
    PostcodeWrapper: styled.div`
        width: auto;
        overflow: auto;
    `,
};

const RequiredStar = styled.span`
    margin-left: 4px;
    color: ${theme.color.Main};
`;
