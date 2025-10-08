const theme = {
    color: {
        White: "#ffffff",
        Gray0: "#F8F8F8", // Light
        Gray1: "#E4E4E4",
        Gray2: "#BEBEBE",
        Gray3: "#A0A0A0",
        Gray4: "#909090",
        Gray5: "#606060", // Dark
        Black: "#111111",
        Main: "#02CCDA",
        Sub1: "#80E5EC",
        Sub2: "#F2FEFF",
        Red1: "#FF1C1C",
        Yellow1: "#FFE41C",
        Green1: "#1CFF1C",
        Blue1: "#1F1CFF",
        LightGray: "#D9D9D9",
        Kakao: "#FEE500",
        Naver: "#03C75A",
    },
    size: {
        HeaderHeight: "74px", // header가 존재할 때 header 높이만큼 띄워주기 위함
        NavHeight: "78px", // nav가 존재할 때 nav 높이만큼 띄워주기 위함
    },
} as const;
export type ThemeType = typeof theme;
export default theme;
