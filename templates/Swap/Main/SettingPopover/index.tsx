import styles from "./SettingPopover.module.sass";
import Image from "@/components/Image";
import { Space, Modal, Popover, InputNumber, Switch } from "antd";
import { runSwap } from "@/helpers/AlphaRouterService";
import { useUniswapStore } from "stores/uniswap.store";
import Button from "@/components/Button";
const gear = "/images/gear.png";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};
interface ModalProps {
  setDeadlineMinutes: (value: number) => void;
  setSlippageAmount: (value: number) => void;
  slippageAmount: number;
  deadlineMinutes: number;
}

const SettingPopoverForm = ({
  slippageAmount,
  deadlineMinutes,
  setDeadlineMinutes,
  setSlippageAmount,
}: ModalProps) => {
  const content = (
    <Space direction="vertical" className={styles.settingInfo}>
      <div className={styles.title}>{"Setting"}</div>
      <div className={styles.body}>{"Slippage tolenrance"}</div>
      <Space direction="horizontal">
        <Button
          style={styles.button}
          type="primary"
          title={<div>Auto</div>}
          onClick={() => {
            setSlippageAmount(0.01);
          }}
        />
        <InputNumber
          className={styles.inputTolerance}
          onChange={(value: any) => {
            setSlippageAmount(value);
          }}
          formatter={(value) => `${value}%`}
          placeholder={"0.01 %"}
          value={slippageAmount}
        />
      </Space>
      <div className={styles.body}>{"Transation deadline"}</div>
      <Space direction="horizontal">
        <InputNumber
          className={styles.inputMinutes}
          onChange={(value: any) => {
            setDeadlineMinutes(value);
          }}
          defaultValue={0}
          value={deadlineMinutes}
        />
        <div className={styles.body}>{"Minutes"}</div>
      </Space>
      <div className={styles.title}>{"Interface Setting"}</div>
      <Space direction="horizontal" className={styles.spaceBetween}>
        <div className={styles.bodySwitch}>{"Auto Router API"}</div>
        <Switch defaultChecked onChange={onChange} />
      </Space>
      <Space direction="horizontal" className={styles.spaceBetween}>
        <div className={styles.bodySwitch}>{"Expert Mode"}</div>
        <Switch className={styles.switch} defaultChecked onChange={onChange} />
      </Space>
    </Space>
  );
  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={content}
      overlayInnerStyle={{
        border: "1px solid #5442D0",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
      }}
    >
      <Button
        style=""
        type="link"
        title={<Image src={gear} width={20} height={20} alt={gear} />}
        onClick={() => console.log(123)}
      />
    </Popover>
  );
};

export default SettingPopoverForm;
