import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import { Button, InputNumber, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ModalForm from "./Modal";
import { SetStateAction, useState } from "react";
import ModalSumbitForm from "./ModalSubmit";
import { cryptos } from "@/mocks/cryptos";

interface pickedCrypto {
  title: string;
  name: string;
  image: string;
}

type MainProps = {};

const transfer = "/images/transfer.svg";
const swap = "/images/swap.svg";

const Main = ({}: MainProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isSwapPressed, setIsSwapPressed] = useState(false);

  const [firstInputValue, setFirstInputValue] = useState(0);
  const [secondInputValue, setSecondInputValue] = useState(0);

  const [firstPickedCrypto, setFirstPickedCrypto] = useState("BTC");
  const [secondPickedCrypto, setSecondPickedCrypto] = useState("ETH");

  const [searchField, setSearchField] = useState("");

  const filteredPersons = cryptos.filter((item) => {
    return item.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchField(event.target.value);
  };

  const filteredFirstCrypto: pickedCrypto[] = cryptos.filter((crypto) => {
    return crypto.title === firstPickedCrypto;
  });
  const { title: firstTitle, image: firstImage } = filteredFirstCrypto[0];

  const filteredSecondCrypto: pickedCrypto[] = cryptos.filter(
    (crypto: pickedCrypto) => {
      return crypto.title === secondPickedCrypto;
    }
  );
  const { title: secondTitle, image: secondImage } = filteredSecondCrypto[0];

  const showFirstModal = () => {
    setIsFirstModalOpen(true);
  };

  const showSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const firstModalCancel = () => {
    setIsFirstModalOpen(false);
  };
  const secondModalCancel = () => {
    setIsSecondModalOpen(false);
  };

  const swapModalCancel = () => {
    setIsSwapPressed(false);
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("appHeader", styles.title)}>SWAP</div>
      <Space direction="vertical" className={styles.border}>
        <Space direction="horizontal" className={styles.input}>
          <Space direction="vertical" className={styles.iconSpace}>
            <InputNumber
              className={styles.inputPlaceholder}
              onChange={(value: any) => setFirstInputValue(value)}
              placeholder="You sen"
              defaultValue={0}
            />
            <Image src={transfer} width={25} height={25} />
          </Space>
          <Space direction="vertical" className={styles.iconSpace}>
            <Button
              type="primary"
              onClick={showFirstModal}
              className={styles.buttonModal}
            >
              <Image src={firstImage} width={35} height={35} alt={firstImage} />
              <div className={styles.bold}>{firstTitle}</div>
              <DownOutlined />
            </Button>
            <Image src={swap} width={25} height={25} />
          </Space>
        </Space>

        <Space direction="horizontal" className={styles.input}>
          <InputNumber
            className={styles.inputPlaceholder}
            onChange={(value: any) => setSecondInputValue(value)}
            placeholder="You sen"
            defaultValue={0}
          />
          <Button
            type="primary"
            onClick={showSecondModal}
            className={styles.buttonModal}
          >
            <Image src={secondImage} width={35} height={35} alt={secondTitle} />
            <div className={styles.bold}>{secondTitle}</div>
            <DownOutlined />
          </Button>
        </Space>
        <Button
          className={styles.button}
          onClick={() => setIsSwapPressed(true)}
        >
          Swap
        </Button>
      </Space>
      <ModalForm
        pickedCryptoItem={firstTitle}
        title="Choose a token"
        open={isFirstModalOpen}
        setPickedCrypto={setFirstPickedCrypto}
        onCancel={firstModalCancel}
      />

      <ModalForm
        pickedCryptoItem={secondTitle}
        title="Choose a token"
        open={isSecondModalOpen}
        setPickedCrypto={setSecondPickedCrypto}
        onCancel={secondModalCancel}
      />

      <ModalSumbitForm
        firstCrypto={filteredFirstCrypto[0]}
        secondCrypto={filteredSecondCrypto[0]}
        firstValue={firstInputValue}
        secondValue={secondInputValue}
        title="Confirm Swap"
        open={isSwapPressed}
        onCancel={swapModalCancel}
      />
    </div>
  );
};

export default Main;
