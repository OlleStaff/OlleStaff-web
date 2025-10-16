import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import PageWrapper from "@/components/PageWrapper";
import { useRef } from "react";
import { useScrollToTopOnPathChange } from "@/hooks/useScrollToTopOnPathChange";
import SessionWatcher from "@/components/SessionWatcher";
import ErrorWatcher from "@/components/ErrorWatcher";

export default function FullscreenLayout() {
    const contentRef = useRef<HTMLDivElement>(null);
    useScrollToTopOnPathChange(contentRef);
    return (
        <>
            <SessionWatcher />
            <ErrorWatcher />
            <PageWrapper isRoot>
                <FullHeightContent ref={contentRef}>
                    <Outlet />
                </FullHeightContent>
            </PageWrapper>
        </>
    );
}

const FullHeightContent = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;
