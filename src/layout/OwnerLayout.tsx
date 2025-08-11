import Nav from "@/components/Nav";
import PageWrapper from "@/components/PageWrapper";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { useRef } from "react";
import { useScrollToTopOnPathChange } from "@/hooks/useScrollToTopOnPathChange";

export default function OwnerLayout() {
    const contentRef = useRef<HTMLDivElement>(null);
    useScrollToTopOnPathChange(contentRef);
    return (
        <PageWrapper hasNav>
            <ContentWrapper ref={contentRef}>
                <Outlet />
            </ContentWrapper>
            <Nav version="owner" />
        </PageWrapper>
    );
}

const ContentWrapper = styled.div`
    padding: 30px;
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none;
`;
