import styles from "./TopAccounts.module.sass";
import { Space } from "antd";
import { topAccounts } from "@/mocks/topAccount";
import Button from "@/components/Button";
type TopAccountProps = {
  topPoint: any;
};

const TopAccountsTable = ({ topPoint }: TopAccountProps) => (
  <div className={styles.topAccountTable}>
    <Space direction="vertical">
      <Space direction="horizontal" className={styles.tableHeader}>
        <div className={styles.bold}>Top Accounts</div>
        <div className={styles.headerTotal}>Total Accounts: 1.1M</div>
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
        topPoint.slice(0, 5).map((account: any, index: number) => (
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
            <div className={styles.walletColumn}>{account.wallet_address}</div>
            <div className={styles.pointDatas}>{account.point}</div>
          </Space>
        ))}
      <Button
        type="link"
        style={styles.viewAllButton}
        title={<div>View All Top Accounts</div>}
        onClick={() => console.log(123)}
      />
    </Space>
  </div>
);

export default TopAccountsTable;
