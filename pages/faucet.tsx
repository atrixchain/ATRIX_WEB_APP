import Loading from "@/components/Loading";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicFaucet = dynamic(() => import("modules/Faucet"), {
  loading: () => <Loading suspense={true}/>,
});

const Home: NextPage = () => {
  return <DynamicFaucet />;
};

export default Home;
