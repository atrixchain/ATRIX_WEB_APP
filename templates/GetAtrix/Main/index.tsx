import cn from "classnames";
import styles from "./Main.module.sass";
import { Space } from "antd";
import Card from "@/components/Card";
import {
  CHECK_TWITTER_TEXT,
  CONNECT_WALLET_TEXT,
  DETAILS,
  REQUEST_DISCORD_TEXT,
  REQUEST_EVERY_TEXT,
  REQUEST_TESTNET,
  REQUEST_TESTNET_TEXT,
  VIEW_ALL_NETWORK,
} from "@/utils/commom";

type MainProps = {};

const Main = ({}: MainProps) => (
  <div className={cn("section", styles.section)}>
    <Space direction="vertical">
      <div>
        <Card
          green
          title={REQUEST_TESTNET}
          firstContent={REQUEST_TESTNET_TEXT}
          secondContent={""}
          firstButtonTitle={CHECK_TWITTER_TEXT}
          secondButtonTitle={CONNECT_WALLET_TEXT}
          thirdButtonTitle={""}
          isThirdButtonOpacity={true}
          purple={false}
          showButtons={true}
          disabled={false}
          opacityText={REQUEST_DISCORD_TEXT}
          viewAllButtonTitle={""}
          isEarnAtrixScreen={false}
        />
      </div>
      <div className={styles.card}>
        <Card
          green
          title={DETAILS}
          firstContent={REQUEST_EVERY_TEXT}
          secondContent={""}
          firstButtonTitle={CHECK_TWITTER_TEXT}
          secondButtonTitle={CONNECT_WALLET_TEXT}
          thirdButtonTitle={""}
          isThirdButtonOpacity={true}
          purple={false}
          disabled={false}
          showButtons={false}
          opacityText={REQUEST_DISCORD_TEXT}
          viewAllButtonTitle={VIEW_ALL_NETWORK}
          isEarnAtrixScreen={false}
        />
      </div>
    </Space>
  </div>
);

export default Main;
