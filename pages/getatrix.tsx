import Loading from "@/components/Loading";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicGetAtrix = dynamic(() => import("modules/GetAtrix"), {
  loading: () => <Loading suspense={true}/>,
});

const Home: NextPage = () => {
  return <DynamicGetAtrix />;
};

export default Home;
