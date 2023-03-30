import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "lib/react-query";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "../styles/app.sass";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ParallaxProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
