import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import PageWrapper from "@/components/PageWrapper";
import SessionWatcher from "@/components/SessionWatcher";

export default function AuthLayout() {
    return (
        <>
            <SessionWatcher />
            <PageWrapper isRoot>
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
            </PageWrapper>
        </>
    );
}

const ContentWrapper = styled.div`
    padding: 30px;
    overflow-y: auto;
`;
