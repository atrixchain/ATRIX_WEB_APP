import styles from "./YourInvites.module.sass";
import { Space } from "antd";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const YourInvitesTable = () => {
  const router = useRouter();

  return (
    <div className={styles.topAccountTable}>
      <Space direction="vertical">
        <Space direction="horizontal" className={styles.tableHeader}>
          <div className={styles.bold}>Your Invites</div>
          {/* <div className={styles.headerTotal}>Total Confirmed: 0</div> */}
        </Space>

        <Button
          style={styles.button}
          onClick={() => router.push("/earnatrix")}
          title={<div>Invite to earn more ATRIX Points</div>}
        />
      </Space>
    </div>
  );
};

export default YourInvitesTable;
