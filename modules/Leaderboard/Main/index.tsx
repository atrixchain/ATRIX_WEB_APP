import cn from "classnames";
import styles from "./Main.module.sass";
import { Col, Row } from "antd";

import YourAccountTable from "./YourAccount";
import TopAccountsTable from "./TopAccounts";
import YourInvitesTable from "./YourInvites";
import { useGetInfo, useGetTopPoint } from "queries/Twitter/Twitter.query";
import { useUniswapStore } from "stores/uniswap.store";
import Loading from "@/components/Loading";

type MainProps = {};

const Main = ({}: MainProps) => {
  const { addedWallet }: any = useUniswapStore();

  const {
    data: getInfoResponse,
    refetch: rfInfo,
    isFetching: isGetInfoLoading,
  } = useGetInfo(addedWallet);

  const userPoint = getInfoResponse?.data?.data?.point?.point;

  const wallets = {
    wallet_address: addedWallet,
    ref_address: "0x09e583d6C248121077496E57550849619b833e7a",
  };
  const {
    data: getToppointsResponse,
    refetch: rfTopPoint,
    isFetching: isGetTopPointLoading,
  } = useGetTopPoint(wallets);

  const topPoint = getToppointsResponse?.data?.data;
  return (
    <div className={cn("section", styles.section)}>
      {(isGetTopPointLoading && <Loading />) ||
        (isGetInfoLoading && <Loading />)}
      <Row gutter={24}>
        <Col span={17}>
          <div>
            <TopAccountsTable topPoint={topPoint} />
          </div>
          <div className={styles.yourInvites}>
            <YourInvitesTable />
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
