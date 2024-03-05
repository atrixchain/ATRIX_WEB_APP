import styles from "./ModalSubmitted.module.sass";
import Image from "@/components/Image";
import { Space, Modal } from "antd";
import Button from "@/components/Button";
import Router from "next/router";
const waitingImage = "/images/submitted.png";

interface ModalProps {
  title: string;
  open: boolean;
  onCancel: VoidFunction;
  hash: string;
  secondCrypto: string;
}

const ModalWaitingForm = ({
  title,
  open,
  onCancel,
  hash,
  secondCrypto,
}: ModalProps) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={420}
        closable={false}
        style={{
          borderRadius: "30px",
        }}
        wrapClassName="modal-radius"
      >
        <Space direction="vertical" className={styles.modalContent}>
          <Image src={waitingImage} width={81} height={81} />
          <Space direction="vertical" className={styles.infomation}>
            <div className={styles.header}>Transaction Submitted</div>
            <Button
              title={<div>View on Atrix Explorer</div>}
              style={styles.viewBsb}
              onClick={() =>
                window
                  ?.open(
                    `https://explorer-testnet.attrixchain.com/tx/${hash}`,
                    "_blank"
                  )
                  ?.focus()
              }
              type="link"
            />
            <Button
              style={styles.addButton}
              onClick={() => {
                Router.push("/");
                onCancel();
              }}
              title={<div>{`Add ${secondCrypto} to Wallet`}</div>}
              type={"primary"}
            />
            <Button
              style={styles.closeButton}
              onClick={() => {
                Router.push("/");
                onCancel();
              }}
              title={<div>{`Close`}</div>}
              type={"primary"}
            />
          </Space>
        </Space>
      </Modal>
    </>
  );
};

export default ModalWaitingForm;
