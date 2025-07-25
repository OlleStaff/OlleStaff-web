import { css } from "@emotion/react";

export const GlobalStyle = () => css`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    html,
    body {
        height: 100%;
    }
    section {
        display: block;
    }
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Pretendard", sans-serif;
        overflow: hidden;
        scroll-behavior: smooth;
        background-color: #efefef;
        height: 100vh;
    }
    #root {
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */
        width: 393px;
        min-width: 375px;
        height: 100vh;
        background-color: white;
        position: relative;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote::before,
    blockquote::after,
    q::before,
    q::after {
        content: "";
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
        font-family: "Pretendard";
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    *::-webkit-scrollbar {
        width: 8px;
    }
    *::-webkit-scrollbar-thumb {
        height: 30%;
        background: gray;
        border-radius: 10px;
    }
    *::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, 0.1);
    }
    *::-webkit-scrollbar-corner {
        background: transparent;
    }
    .ql-align-right {
        display: flex;
        justify-content: flex-end;
    }
    .ql-align-center {
        display: flex;
        justify-content: center;
    }
`;
