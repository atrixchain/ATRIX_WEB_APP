import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";

import { headerNavigation } from "@/constants/navigation";
import NavLink from "../NavLink";
import { notification } from "antd";
import { ethers } from "ethers";
import { useState } from "react";
import Button from "../Button";
const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
interface HeaderProps {}

type NotificationType = "success" | "info" | "warning" | "error";

export enum ToastifyStatus {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}
const Header = ({}: HeaderProps) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  console.log("currentAccount", currentAccount);

  const openNotification = (
    message: string,
    description: string,
    type: NotificationType
  ) => {
    api[type]({
      message: message,
      description: description || "",
    });
  };

  const connectWalletHandler = async () => {
    const { ethereum }: any = window;

    if (!ethereum) {
      openNotification("Please install Metamask!", "", ToastifyStatus.WARNING);
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      openNotification("Wallet connected", accounts[0], ToastifyStatus.SUCCESS);
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      openNotification("No authorized account found", "", ToastifyStatus.ERROR);
    }
  };

  return (
    <header className={cn(styles.header)}>
      {contextHolder}
      <div className={cn("container-wide", styles.container)}>
        <Logo white className={styles.logo} />

        <div className={styles.menu}>
          {headerNavigation.map((link, index) =>
            link.external ? (
              <a
                className={styles.link}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {link.title}
              </a>
            ) : (
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                href={link.url}
                key={index}
              >
                {link.title}
              </NavLink>
            )
          )}
        </div>
        <Button
          style={styles.balance}
          onClick={() => console.log(123)}
          title={<div>5.000 ZP</div>}
          type={"primary"}
        />
        <Button
          style={styles.button}
          onClick={connectWalletHandler}
          title={<div>Connect wallet</div>}
          type={"primary"}
        />
      </div>
    </header>
  );
};

export default Header;
