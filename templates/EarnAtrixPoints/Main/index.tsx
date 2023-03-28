import cn from "classnames";
import styles from "./Main.module.sass";
import { Space } from "antd";
import Card from "@/components/Card";
import {
  COPY_LINK,
  EARN_ATRIX,
  INVITE_FOR_EACH_PERSON,
  INVITE_USING_LINK,
  SHARE_TW,
  VERIFY_TW_BUTTON,
} from "@/utils/commom";

type MainProps = {};

const Main = ({}: MainProps) => (
  <div className={cn("section", styles.section)}>
    <Space direction="vertical">
      <div className={styles.card}>
        <Card
          green={false}
          title={EARN_ATRIX}
          firstContent={INVITE_USING_LINK}
          secondContent={INVITE_FOR_EACH_PERSON}
          firstButtonTitle={VERIFY_TW_BUTTON}
          secondButtonTitle={SHARE_TW}
          thirdButtonTitle={COPY_LINK}
          isThirdButtonOpacity={false}
          purple={false}
          disabled={true}
          showButtons={true}
          opacityText={""}
          viewAllButtonTitle={""}
          isEarnAtrixScreen={true}
        />
      </div>
    </Space>
  </div>
);

export default Main;
