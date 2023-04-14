import { useRef } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import { Col, Row } from "antd";

const FaucetPage = () => {
  const scrollToRef = useRef(null);
  return (
    <Row>
      <Col span={24}>
        <Layout>
          <Main scrollToRef={scrollToRef} />
        </Layout>
      </Col>
    </Row>
  );
};

export default FaucetPage;
