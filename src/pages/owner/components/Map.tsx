import { useEffect, useRef } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadKakaoMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                return;
            }

            window.kakao.maps.load(() => {
                const mapContainer = mapRef.current;
                if (!mapContainer) return;

                const mapOption = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 5,
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(latitude, longitude),
                });
                marker.setMap(map);
            });
        };

        if (window.kakao && window.kakao.maps) {
            loadKakaoMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
                import.meta.env.VITE_KAKAO_CLIENT_ID
            }&autoload=false&libraries=services`;
            script.async = true;
            script.onload = () => {
                window.kakao.maps.load(loadKakaoMap);
            };
            document.head.appendChild(script);
        }
    }, [latitude, longitude]);

    return <div ref={mapRef} style={{ width: "100%", height: "210px", borderRadius: "12px" }} />;
};

export default MapComponent;
