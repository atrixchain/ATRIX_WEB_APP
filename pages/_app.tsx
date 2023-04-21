import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "lib/react-query";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/app.sass";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

function MyApp({ Component, pageProps }: AppProps) {
  const chains = [arbitrum, mainnet, polygon];
  const projectId = "c57df66246ebf09d372877167e996915";

  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ParallaxProvider>
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </WagmiConfig>
        </ParallaxProvider>
      </QueryClientProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default MyApp;
