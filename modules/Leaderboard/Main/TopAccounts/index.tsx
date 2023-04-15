import styles from "./TopAccounts.module.sass";
import { Space } from "antd";
import { topAccounts } from "@/mocks/topAccount";
import Button from "@/components/Button";
import { useState } from "react";
type TopAccountProps = {
  topPoint: any;
};

const TopAccountsTable = ({ topPoint }: TopAccountProps) => {
  const [slideData, setSlideData] = useState<number>(5);
  return (
    <div className={styles.topAccountTable}>
      <Space direction="vertical">
        <Space direction="horizontal" className={styles.tableHeader}>
          <div className={styles.bold}>Top Accounts</div>
          <div className={styles.headerTotal}>Total Accounts: 0M</div>
        </Space>
        <Space direction="horizontal" className={styles.table}>
          <Space direction="horizontal" className={styles.name}>
            <div className={styles.nameIndexColumn}>#</div>
            <div>Name</div>
          </Space>
          <div className={styles.addressColumn}>Address</div>
          <div>ATRIX Points</div>
        </Space>
        {topPoint &&
          topPoint.slice(0, slideData).map((account: any, index: number) => (
            <Space
              direction="horizontal"
              className={styles.table}
              key={index}
              wrap
            >
              <Space direction="horizontal" className={styles.name}>
                <div className={styles.nameIndexColumn}>{index + 1}</div>
                <div className={styles.userColumn}>{"User"}</div>
              </Space>
              <Space></Space>
              <div className={styles.walletColumn}>
                {account.wallet_address}
              </div>
              <div className={styles.pointDatas}>{account.point}</div>
            </Space>
          ))}
        <Button
          type="link"
          style={styles.viewAllButton}
          title={<div>View All Top Accounts</div>}
          onClick={() => setSlideData(20)}
        />
      </Space>
    </div>
  );
};

export default TopAccountsTable;
