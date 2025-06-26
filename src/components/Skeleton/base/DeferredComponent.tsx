import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    delay?: number; // 몇 ms 후 보여줄지
}

export default function DeferredComponent({ children, delay = 500 }: Props) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldRender(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, []);

    return shouldRender ? <>{children}</> : null;
}
