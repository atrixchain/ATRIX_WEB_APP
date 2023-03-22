import { useRef } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";

// import { reviews } from "@/mocks/reviews";

const FaucetPage = () => {
  const scrollToRef = useRef(null);
  return (
    <Layout>
      <Main scrollToRef={scrollToRef} />
    </Layout>
  );
};

export default FaucetPage;
