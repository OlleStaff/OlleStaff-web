// main.tsx
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import theme from "./styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <Global styles={GlobalStyle} />
        </ThemeProvider>
    </QueryClientProvider>
);
