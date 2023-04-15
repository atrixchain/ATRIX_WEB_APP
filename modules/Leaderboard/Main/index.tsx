import cn from "classnames";
import styles from "./Main.module.sass";
import { Col, Row } from "antd";

import YourAccountTable from "./YourAccount";
import TopAccountsTable from "./TopAccounts";
import YourInvitesTable from "./YourInvites";
import { useTwiiterStore } from "stores/twiiter.store";
import { useState } from "react";

type MainProps = {};

const Main = ({}: MainProps) => {
  const { point, topPoint }: any = useTwiiterStore();

  return (
    <div className={cn("section", styles.section)}>
      <Row gutter={24}>
        <Col span={16}>
          <div>
            <TopAccountsTable topPoint={topPoint} />
          </div>
          <div className={styles.yourInvites}>
            <YourInvitesTable />
          </div>
        </Col>
        <Col span={8}>
          <YourAccountTable userPoint={point} />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
