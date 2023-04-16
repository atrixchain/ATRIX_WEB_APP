import cn from "classnames";
import styles from "./Main.module.sass";
import { Col, Row } from "antd";

import YourAccountTable from "./YourAccount";
import TopAccountsTable from "./TopAccounts";
import YourInvitesTable from "./YourInvites";
import { useTwiiterStore } from "stores/twiiter.store";
import { useEffect, useState } from "react";
import { useGetInfo, useGetTopPoint } from "queries/Twiiter/Twiiter.query";
import { useUniswapStore } from "stores/uniswap.store";

type MainProps = {};

const Main = ({}: MainProps) => {
  const { addedWallet }: any = useUniswapStore();

  const {
    mutate: addWallet,
    data: getInfoResponse,
    isLoading: isAddBankLoading,
  } = useGetInfo();

  const userPoint = getInfoResponse?.data?.data?.point?.point;

  const handleGetInfo = (address: string) => {
    const data = {
      wallet_address: address,
    };
    addWallet(data);
  };
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

  useEffect(() => {
    handleGetInfo(addedWallet);
  }, [topPoint]);

  return (
    <div className={cn("section", styles.section)}>
      <Row gutter={24}>
        <Col span={17}>
          <div>
            <TopAccountsTable topPoint={topPoint} />
          </div>
          <div className={styles.yourInvites}>
            <YourInvitesTable rfTopPoint={rfTopPoint} />
          </div>
        </Col>
        <Col span={7}>
          <YourAccountTable userPoint={userPoint} />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
