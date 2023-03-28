import styles from "./YourInvites.module.sass";
import { Button, Space } from "antd";
type YourInvitesProps = {};

const YourInvitesTable = ({}: YourInvitesProps) => (
  <div className={styles.topAccountTable}>
    <Space direction="vertical">
      <Space direction="horizontal" className={styles.tableHeader}>
        <div className={styles.bold}>Your Invites</div>
        <div className={styles.headerTotal}>Total Confirmed: 0</div>
      </Space>
      <Button className={styles.button} onClick={() => console.log(123)}>
        Invite to earn more ATRIX Points
      </Button>
    </Space>
  </div>
);

export default YourInvitesTable;
