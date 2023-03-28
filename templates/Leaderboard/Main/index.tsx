import cn from "classnames";
import styles from "./Main.module.sass";
import { Col, Row } from "antd";

import YourAccountTable from "./YourAccount";
import TopAccountsTable from "./TopAccounts";
import YourInvitesTable from "./YourInvites";

type MainProps = {};

const Main = ({}: MainProps) => {
  return (
    <div className={cn("section", styles.section)}>
      <Row gutter={24}>
        <Col span={15}>
          <div>
            <TopAccountsTable />
          </div>
          <div className={styles.yourInvites}>
            <YourInvitesTable />
          </div>
        </Col>
        <Col span={8}>
          <YourAccountTable />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
