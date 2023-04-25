import Loading from "@/components/Loading";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicLeaderboard = dynamic(() => import("modules/Leaderboard"), {
  loading: () => <Loading suspense={true} />,
});

const Home: NextPage = () => {
  return <DynamicLeaderboard />;
};

export default Home;
