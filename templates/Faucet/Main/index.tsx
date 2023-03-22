import { Parallax } from "react-scroll-parallax";
import cn from "classnames";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import Scroll from "@/components/Scroll";
import { Button, Input, Space } from "antd";
const images = [
  "/images/figures/figure-11.png",
  "/images/figures/figure-12.png",
  "/images/figures/figure-13.png",
  "/images/figures/figure-14.png",
];

type MainProps = {
  scrollToRef: any;
};

const Main = ({ scrollToRef }: MainProps) => (
  <div className={cn("section", styles.section)}>
    <div className={cn("appHeader", styles.title)}>ATRIX FAUCET</div>

    <Space direction="horizontal" className={styles.input}>
      <Input
        className={styles.inputPlaceholder}
        placeholder="Enter Your Wallet Address (0x...)i"
      />
      <Button className={styles.button} onClick={() => console.log(123)}>
        Send Me ATRIX
      </Button>
    </Space>
  </div>
);

export default Main;
