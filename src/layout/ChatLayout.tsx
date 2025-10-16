import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import PageWrapper from "@/components/PageWrapper";
import Nav from "@/components/Nav";
import SessionWatcher from "@/components/SessionWatcher";
import ErrorWatcher from "@/components/ErrorWatcher";

export default function CommonLayout() {
    return (
        <>
            <SessionWatcher />
            <ErrorWatcher />
            <PageWrapper hasNav>
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
                <Nav />
            </PageWrapper>
        </>
    );
}

const ContentWrapper = styled.div`
    padding: 30px;
    overflow-y: auto;
`;
