import cn from "classnames";
import styles from "./Main.module.sass";
import { Col, Row } from "antd";

import YourAccountTable from "./YourAccount";
import TopAccountsTable from "./TopAccounts";
import YourInvitesTable from "./YourInvites";
import { useTwiiterStore } from "stores/twiiter.store";
import { useEffect, useState } from "react";
import { useGetTopPoint } from "queries/Twiiter/Twiiter.query";
import { useUniswapStore } from "stores/uniswap.store";

type MainProps = {};

const Main = ({}: MainProps) => {
  const { addedWallet }: any = useUniswapStore();
  const { point }: any = useTwiiterStore();

  const wallets = {
    wallet_address: addedWallet,
    ref_address: "0x09e583d6C248121077496E57550849619b833e7a",
  };
  const {
    data: getToppointsResponse,
    isLoading: getTopPointLoading,
    refetch: rfTopPoint,
  } = useGetTopPoint(wallets);

  const topPoint = getToppointsResponse?.data?.data;
  
  return (
    <div className={cn("section", styles.section)}>
      <Row gutter={24}>
        <Col span={16}>
          <div>
            <TopAccountsTable topPoint={topPoint} />
          </div>
          <div className={styles.yourInvites}>
            <YourInvitesTable rfTopPoint={rfTopPoint} />
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
