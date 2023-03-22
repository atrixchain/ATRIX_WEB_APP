import styles from "./ModalSubmit.module.sass";
import Image from "@/components/Image";
import { Button, Input, Space, Modal, List } from "antd";
import { cryptos } from "@/mocks/cryptos";
type ModalProps = {
  title: string;
  open: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
  setFirstPickCrypto: (value: string) => void;
  setSecondPickCrypto: (value: string) => void;
  isFirstCryptoPicked: boolean;
  setIsFirstCryptoPicked: (value: boolean) => void;
};

const ModalSumbitForm = ({
  title,
  open,
  onOk,
  onCancel,
  setFirstPickCrypto,
  setSecondPickCrypto,
  isFirstCryptoPicked,
  setIsFirstCryptoPicked,
}: ModalProps) => (
  <Modal
    title={title}
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    footer={null}
    width={550}
    style={{
      borderRadius: "30px",
    }}
    className={styles.modalStyle}
  >
    <Input
      className={styles.inputPlaceholder}
      placeholder="Search for a name or paste an address"
    />
    <Space wrap direction="horizontal" className={styles.cryptos}>
      {cryptos.map((item, index) => (
        <Button
          key={index}
          type="primary"
          className={styles.buttonModal}
          onClick={() => {
            if (!isFirstCryptoPicked) {
              setFirstPickCrypto(item.title);
              setIsFirstCryptoPicked(!isFirstCryptoPicked);
            }
            if (isFirstCryptoPicked) {
              setSecondPickCrypto(item.title);
              setIsFirstCryptoPicked(!isFirstCryptoPicked);
            }
            onCancel();
          }}
        >
          <Image src={item.image} width={35} height={35} alt="Post" />
          <div className={styles.bold}> {item.title}</div>
        </Button>
      ))}
    </Space>
    <div id="scrollableDiv" className={styles.scrollable}>
      <List
        dataSource={cryptos}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Space direction="horizontal">
              <Image src={item.image} width={45} height={45} alt="Post" />
              <Space direction="vertical" className={styles.itemName}>
                <div className={styles.bold}>{item.name}</div>
                <div className={styles.fade}>{item.title}</div>
              </Space>
            </Space>
          </List.Item>
        )}
      />
    </div>
  </Modal>
);

export default ModalSumbitForm;
