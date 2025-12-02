const publicPatterns: RegExp[] = [
    /^\/staff\/?$/,
    /^\/staff\/category\/?$/,
    /^\/staff\/accompany\/?$/,
    /^\/staff\/accompany\/[^/]+\/?$/,
    /^\/staff\/guesthouse\/latest\/?$/,
    /^\/recruit\/[^/]+\/?$/,
];

export function isPublicPath(pathname: string) {
    return publicPatterns.some(pattern => pattern.test(pathname));
}
