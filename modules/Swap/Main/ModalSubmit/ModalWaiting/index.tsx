import styles from "./ModalWaiting.module.sass";
import Image from "@/components/Image";
import { Space, Modal } from "antd";
const waitingImage = "/images/waiting.gif";
interface ModalProps {
  title: string;
  open: boolean;
  onCancel: VoidFunction;
  swapInfo: any;
}

const ModalWaitingForm = ({ title, open, onCancel, swapInfo }: ModalProps) => {
  const { inputAmount, outputAmount, firstPickedCrypto, secondPickedCrypto } =
    swapInfo;

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
          <Image src={waitingImage} width={270} height={210} />
          <Space direction="vertical" className={styles.infomation}>
            <div className={styles.header}>Waiting For Confirmation</div>
            <div className={styles.swapping}>
              {`swapping ${inputAmount} ${firstPickedCrypto} for ${outputAmount} ${secondPickedCrypto}`}
            </div>
            <div className={styles.confirm}>
              Confirm this transaction in your wallet
            </div>
          </Space>
        </Space>
      </Modal>
    </>
  );
};

export default ModalWaitingForm;
