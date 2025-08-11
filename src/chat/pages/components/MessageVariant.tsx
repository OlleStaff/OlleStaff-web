export function TextMessage({ text }: { text: string }) {
    return <>{text}</>;
}

export function ImageMessage({ images }: { images: string[] }) {
    console.log("이미지 배열", images);
    return <>{images}</>;
}

export function FileMessage({ name, link }: { name: string; link: string }) {
    console.log("name", name);
    console.log("link", link);

    return (
        <>
            {name}
            {link}
        </>
    );
}

export function ApplicantCard({
    applicantId,
    employmentId,
    title,
    detail,
}: {
    applicantId: number;
    employmentId: number;
    title: string;
    detail: string;
}) {
    console.log("applicantId", applicantId);
    console.log("employmentId", employmentId);
    console.log("title", title);
    console.log("detail", detail);
    return (
        <>
            {applicantId}
            {employmentId}
            {title}
            {detail}
        </>
    );
}

export function AcceptedCard({ employmentId, title, detail }: { employmentId: number; title: string; detail: string }) {
    console.log("employmentId", employmentId);
    console.log("title", title);
    console.log("detail", detail);

    return (
        <>
            {employmentId}
            {title}
            {detail}
        </>
    );
}
