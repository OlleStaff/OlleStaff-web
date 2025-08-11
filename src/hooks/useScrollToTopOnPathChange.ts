import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// SPA 문제 : 브라우저가 페이지를 완전히 새로고침하지 않고 내부적으로 컴포넌트만 교체 -> 스크롤 위치도 자동으로 초기화되지 않음
// 위 문제를 해결하기 위한 훅
export function useScrollToTopOnPathChange(ref: React.RefObject<HTMLElement | null>) {
    const { pathname } = useLocation();

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [pathname, ref]);
}
