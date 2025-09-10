import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import PageWrapper from "@/components/PageWrapper";
import Nav from "@/components/Nav";
import { useUserStore } from "@/store/useUserStore";
import SessionWatcher from "@/components/SessionWatcher";

const mapUserType = (type: "STAFF" | "GUESTHOUSE" | null): "staff" | "owner" => {
    if (type === "GUESTHOUSE") return "owner";
    return "staff";
};

export default function CommonLayout() {
    const type = useUserStore(state => state.type);
    const version = mapUserType(type);

    return (
        <>
            <SessionWatcher />
            <PageWrapper hasNav>
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
                <Nav version={version} />
            </PageWrapper>
        </>
    );
}

const ContentWrapper = styled.div`
    padding: 30px;
    overflow-y: auto;
`;
