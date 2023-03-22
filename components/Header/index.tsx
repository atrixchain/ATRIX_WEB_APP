import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";

import { footerNavigation, headerNavigation } from "@/constants/navigation";
import NavLink from "../NavLink";
import { Button } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  console.log("currentAccount", currentAccount);

  useEffect(() => {
    checkWalletIsConnected;
  }, []);
  
  const checkWalletIsConnected = async () => {
    const { ethereum }: any = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum }: any = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={cn(styles.header)}>
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
        <Button className={styles.button} onClick={connectWalletHandler}>
          <div className={styles.buttonText}>Connect wallet</div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
