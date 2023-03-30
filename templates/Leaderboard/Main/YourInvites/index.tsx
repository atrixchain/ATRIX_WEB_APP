import styles from "./YourInvites.module.sass";
import { Space } from "antd";
import Button from "@/components/Button";
type YourInvitesProps = {};

const YourInvitesTable = ({}: YourInvitesProps) => (
  <div className={styles.topAccountTable}>
    <Space direction="vertical">
      <Space direction="horizontal" className={styles.tableHeader}>
        <div className={styles.bold}>Your Invites</div>
        <div className={styles.headerTotal}>Total Confirmed: 0</div>
      </Space>
      <Button
        style={styles.button}
        onClick={() => console.log(123)}
        title={<div>Invite to earn more ATRIX Points</div>}
      />
    </Space>
  </div>
);

export default YourInvitesTable;
