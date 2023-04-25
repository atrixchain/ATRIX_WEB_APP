import Loading from "@/components/Loading";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicEarnAtrix = dynamic(() => import("modules/EarnAtrixPoints"), {
  loading: () => <Loading suspense={true}/>,
});

const Home: NextPage = () => {
  return <DynamicEarnAtrix />;
};

export default Home;
