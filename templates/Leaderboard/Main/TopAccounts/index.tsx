import styles from "./TopAccounts.module.sass";
import { Button, Space } from "antd";
import { topAccounts } from "@/mocks/topAccount";
type TopAccountProps = {};

const TopAccountsTable = ({}: TopAccountProps) => (
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
      {topAccounts.map((account, index) => (
        <Space direction="horizontal" className={styles.table} key={index}>
          <Space direction="horizontal" className={styles.name}>
            <div className={styles.nameIndexColumn}>{account.index}</div>
            <div>{account.name}</div>
          </Space>
          <div className={styles.addressColumnData}>{account.address}</div>
          <div className={styles.pointDatas}>{account.points}</div>
        </Space>
      ))}
      <Button type="link" className={styles.viewAllButton}>
        View All Top Accounts
      </Button>
    </Space>
  </div>
);

export default TopAccountsTable;
