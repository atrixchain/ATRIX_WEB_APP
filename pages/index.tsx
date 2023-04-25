import Loading from "@/components/Loading";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicSwap = dynamic(() => import("modules/Swap"), {
  loading: () => <Loading suspense={true}/>,
});

const Home: NextPage = () => {
  return <DynamicSwap />;
};

export default Home;
