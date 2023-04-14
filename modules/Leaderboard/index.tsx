import Layout from "@/components/Layout";
import Main from "./Main";
import { Col, Row } from "antd";

const LeaderboardPage = () => {
  return (
    <Row>
      <Col span={24}>
        <Layout>
          <Main />
        </Layout>
      </Col>
    </Row>
  );
};

export default LeaderboardPage;
