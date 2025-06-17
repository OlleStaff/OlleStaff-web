import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import TabSelector from "@/components/TabSelector";
import { StaffTabTypes, TAB_LABELS } from "@/constants/tabs";
import { useState } from "react";

export default function ChatPage() {
        const [filter, setFilter] = useState<StaffTabTypes["CHAT_LIST"]>("전체");
    
    return (
        <>
            <Header title="채팅 리스트" />
            <PageWrapper hasHeader hasNav>
                <TabSelector
                    labels={[...TAB_LABELS.STAFF.CHAT_LIST]}
                    selected={filter}
                    onChange={label => setFilter(label as StaffTabTypes["CHAT_LIST"])}
                    variant="underline"
                ></TabSelector>
            </PageWrapper>
        </>
    );
}
