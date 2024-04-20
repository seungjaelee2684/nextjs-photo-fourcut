import type { AppProps } from "next/app";
import "../app/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/header";

export default function MyApp({ Component, pageProps }: AppProps) {
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <main className={"min-h-screen"}>
          <Header />
          <Component {...pageProps} />
          {/* toast 컴포넌트 달아둠으로써 toast알림이 발생했을때 화면에 나타나게 한다. */ }
        </main>
        <ModeToggle className={"absolute top-6 right-6"} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}